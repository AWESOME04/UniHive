import { Request, Response, NextFunction } from 'express';
import { initializeTransaction, verifyTransaction, calculatePlatformFee } from '../services/paystackService';
import { Transaction, Hive, User, HiveType } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

/**
 * Initialize a payment for a hive service/item
 */
export const initializePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { hiveId } = req.params;
    const buyerId = req.user.id;
    
    // Find the hive with its type
    const hive = await Hive.findByPk(hiveId, {
      transaction,
      include: [
        {
          model: User,
          as: 'postedByUser',
          attributes: ['id', 'email', 'name']
        },
        {
          model: HiveType,
          attributes: ['id', 'name']
        }
      ]
    });
    
    if (!hive) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Hive not found'
      });
      return;
    }
    
    // Check if user is not trying to pay for their own hive
    if (hive.postedById === buyerId) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'You cannot pay for your own listing'
      });
      return;
    }
    
    // Get buyer details
    const buyer = await User.findByPk(buyerId, {
      attributes: ['id', 'email', 'name'],
      transaction
    });
    
    if (!buyer) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'Buyer information not found'
      });
      return;
    }

    // Check if the seller exists for this hive
    let sellerId = null;
    // For events or items that don't need a direct seller (like Buzz events), keep sellerId null
    if (hive.hiveType?.name !== 'Buzz') {
      // Only set sellerId if the poster exists
      if (hive.postedById) {
        // Verify that the seller actually exists in the database
        const seller = await User.findByPk(hive.postedById, { transaction });
        if (seller) {
          sellerId = seller.id;
        } else {
          // If seller doesn't exist but trying to set sellerId, fail gracefully
          await transaction.rollback();
          res.status(400).json({
            status: 'error',
            message: 'The seller for this hive no longer exists'
          });
          return;
        }
      }
    }
    
    // Calculate platform fee
    const amount = parseFloat(hive.price?.toString() || '0');
    
    // Check if amount is valid
    if (amount <= 0) {
      await transaction.rollback();
      res.status(400).json({
        status: 'error',
        message: 'Invalid payment amount. Price must be greater than 0.'
      });
      return;
    }
    
    const platformFee = calculatePlatformFee(amount);
    
    // Generate a unique reference
    const reference = `unihive-${uuidv4()}`;
    
    // Save transaction record
    const paymentTransaction = await Transaction.create({
      buyerId,
      sellerId,  // This can be null now
      hiveId: hive.id,
      amount,
      platformFee,
      paystackReference: reference,
      status: 'pending',
      metadata: {
        hiveTitle: hive.title,
        hiveType: hive.hiveTypeId,
        buyerName: buyer.name,
        sellerName: hive.postedByUser?.name || 'Unknown'
      }
    }, { transaction });
    
    // Initialize payment with Paystack
    const callbackUrl = `${process.env.FRONTEND_URL}/payment/verify`;
    
    const paystackResponse = await initializeTransaction({
      amount: amount, // Make sure this is a positive number
      email: buyer.email,
      reference,
      metadata: {
        transactionId: paymentTransaction.id,
        hiveId: hive.id,
        hiveTitle: hive.title,
        buyerId,
        buyerName: buyer.name,
        sellerId: sellerId || undefined
      },
      callback_url: callbackUrl
    });
    
    await transaction.commit();
    
    res.status(200).json({
      status: 'success',
      message: 'Payment initialized',
      data: {
        authorizationUrl: paystackResponse.data.authorization_url,
        reference: paystackResponse.data.reference,
        transactionId: paymentTransaction.id
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Payment initialization error:', error);
    
    // Add more detailed error logging
    // if (error.response) {
    //   console.error('Paystack error response:', {
    //     status: error.response.status,
    //     data: error.response.data
    //   });
    // }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to initialize payment'
    });
  }
};

/**
 * Verify a payment transaction
 */
export const verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { reference } = req.query;
    
    if (!reference) {
      res.status(400).json({
        status: 'error',
        message: 'Transaction reference is required'
      });
      return;
    }
    
    // Find transaction in our DB
    const transaction = await Transaction.findOne({
      where: { paystackReference: reference }
    });
    
    if (!transaction) {
      res.status(404).json({
        status: 'error',
        message: 'Transaction not found'
      });
      return;
    }
    
    // Verify transaction with Paystack
    const paystackResponse = await verifyTransaction(reference.toString());
    
    if (paystackResponse.data.status === 'success') {
      // Update transaction status
      await transaction.update({
        status: 'successful',
        metadata: {
          ...transaction.metadata,
          paymentGatewayResponse: paystackResponse.data
        }
      });
      
      // Update hive status if needed based on hive type
      const hive = await Hive.findByPk(transaction.hiveId);
      
      if (hive && hive.status === 'open') {
        // For direct purchases like Essentials, mark as completed
        // For services like Academia or Logistics, mark as paid but not completed
        const hiveTypeId = hive.hiveTypeId;
        const directPurchaseTypes = ['Essentials', 'Archive']; // Types that complete immediately
        
        const hiveType = await hive.$get('hiveType');
        
        if (hiveType && directPurchaseTypes.includes(hiveType.name)) {
          await hive.update({ status: 'completed', assignedToId: transaction.buyerId });
        } else {
          await hive.update({ status: 'paid' });
        }
      }
      
      res.status(200).json({
        status: 'success',
        message: 'Payment successful',
        data: {
          transactionId: transaction.id,
          hiveId: transaction.hiveId,
          amount: transaction.amount
        }
      });
    } else {
      // Update transaction status to failed
      await transaction.update({
        status: 'failed',
        metadata: {
          ...transaction.metadata,
          paymentGatewayResponse: paystackResponse.data
        }
      });
      
      res.status(400).json({
        status: 'error',
        message: 'Payment verification failed',
        data: {
          reference: transaction.paystackReference
        }
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to verify payment'
    });
  }
};

/**
 * Handle Paystack webhook events
 */
export const webhookHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const event = req.body;
    
    // Return 200 immediately to acknowledge receipt
    res.sendStatus(200);
    
    // Process the event asynchronously
    if (event.event === 'charge.success') {
      const reference = event.data.reference;
      const transaction = await Transaction.findOne({
        where: { paystackReference: reference }
      });
      
      if (transaction && transaction.status !== 'successful') {
        // Update transaction status
        await transaction.update({
          status: 'successful',
          metadata: {
            ...transaction.metadata,
            paymentGatewayResponse: event.data
          }
        });
        
        // Update hive status if needed
        const hive = await Hive.findByPk(transaction.hiveId);
        
        if (hive && hive.status === 'open') {
          const hiveType = await hive.$get('hiveType');
          
          if (hiveType && ['Essentials', 'Archive'].includes(hiveType.name)) {
            await hive.update({ status: 'completed', assignedToId: transaction.buyerId });
          } else {
            await hive.update({ status: 'paid' });
          }
        }
      }
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
  }
};

/**
 * Get payment history for the current user
 */
export const getPaymentHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;
    
    const payments = await Transaction.findAll({
      where: {
        [Op.or]: [
          { buyerId: userId },
          { sellerId: userId }
        ]
      },
      include: [
        {
          model: Hive,
          as: 'transactionHive',
          include: [{ model: User, as: 'postedByUser', attributes: ['id', 'name'] }]
        },
        {
          model: User,
          as: 'buyer', // Updated alias
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'seller', // Updated alias
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch payment history'
    });
  }
};
