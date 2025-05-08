import { Request, Response, NextFunction } from 'express';
import { Hive, HiveType, LogisticsHive } from '../models';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

// Create a new Logistics Hive
export const createLogisticsHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { 
      title, 
      description, 
      price,
      pickupLocation,
      dropoffLocation,
      itemSizeWeight,
      isUrgent,
      specialInstructions,
      isRecurring,
      recurringFrequency,
      deadline
    } = req.body;
    
    // Find the Logistics hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Logistics' },
      transaction
    });
    
    if (!hiveType) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Logistics hive type not found'
      });
      return;
    }
    
    // Create main hive record
    const hive = await Hive.create({
      title,
      description,
      price,
      status: 'open',
      postedById: userId,
      hiveTypeId: hiveType.id,
      deadline: deadline ? new Date(deadline) : null
    }, { transaction });
    
    // Create logistics specific details
    await LogisticsHive.create({
      hiveId: hive.id,
      pickupLocation,
      dropoffLocation,
      itemSizeWeight,
      isUrgent: isUrgent || false,
      specialInstructions,
      isRecurring: isRecurring || false,
      recurringFrequency
    }, { transaction });
    
    await transaction.commit();
    
    // Fetch the complete hive with details
    const completeHive = await Hive.findByPk(hive.id, {
      include: [
        { model: HiveType },
        { 
          model: LogisticsHive,
          as: 'logisticsDetails'
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Logistics request created successfully',
      data: completeHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating logistics hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create logistics request'
    });
  }
};

// Update a Logistics Hive
export const updateLogisticsHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { 
      title, 
      description, 
      price,
      pickupLocation,
      dropoffLocation,
      itemSizeWeight,
      isUrgent,
      specialInstructions,
      isRecurring,
      recurringFrequency,
      deadline
    } = req.body;
    
    // Find the hive
    const hive = await Hive.findByPk(id, { transaction });
    
    if (!hive) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Hive not found'
      });
      return;
    }
    
    // Check if user is the poster
    if (hive.postedById !== userId) {
      await transaction.rollback();
      res.status(403).json({
        status: 'error',
        message: 'You are not authorized to update this request'
      });
      return;
    }
    
    // Update main hive record
    if (title) hive.title = title;
    if (description) hive.description = description;
    if (price) hive.price = price;
    if (deadline) hive.deadline = new Date(deadline);
    
    await hive.save({ transaction });
    
    // Find and update logistics details
    const logisticsDetails = await LogisticsHive.findOne({
      where: { hiveId: id },
      transaction
    });
    
    if (!logisticsDetails) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Logistics details not found'
      });
      return;
    }
    
    // Update logistics specific fields
    if (pickupLocation) logisticsDetails.pickupLocation = pickupLocation;
    if (dropoffLocation) logisticsDetails.dropoffLocation = dropoffLocation;
    if (itemSizeWeight) logisticsDetails.itemSizeWeight = itemSizeWeight;
    if (isUrgent !== undefined) logisticsDetails.isUrgent = isUrgent;
    if (specialInstructions) logisticsDetails.specialInstructions = specialInstructions;
    if (isRecurring !== undefined) logisticsDetails.isRecurring = isRecurring;
    if (recurringFrequency) logisticsDetails.recurringFrequency = recurringFrequency;
    
    await logisticsDetails.save({ transaction });
    
    await transaction.commit();
    
    // Fetch the updated hive with details
    const updatedHive = await Hive.findByPk(id, {
      include: [
        { model: HiveType },
        { 
          model: LogisticsHive,
          as: 'logisticsDetails'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Logistics request updated successfully',
      data: updatedHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating logistics hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update logistics request'
    });
  }
};

// Get all Logistics Hives with filter options
export const getAllLogisticsHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      isUrgent, 
      isRecurring, 
      minPrice, 
      maxPrice,
      search,
      limit = 10,
      offset = 0
    } = req.query;
    
    // Find the Logistics hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Logistics' }
    });
    
    if (!hiveType) {
      res.status(404).json({
        status: 'error',
        message: 'Logistics hive type not found'
      });
      return;
    }
    
    const whereClause: any = {
      hiveTypeId: hiveType.id
    };
    
    // Filter by price range
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = Number(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = Number(maxPrice);
    }
    
    // Search in title or description
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    const logisticsWhere: any = {};
    
    // Apply logistics-specific filters
    if (isUrgent !== undefined) {
      logisticsWhere.isUrgent = isUrgent === 'true';
    }
    
    if (isRecurring !== undefined) {
      logisticsWhere.isRecurring = isRecurring === 'true';
    }
    
    const hives = await Hive.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      include: [
        { model: HiveType },
        { 
          model: LogisticsHive,
          as: 'logisticsDetails',
          where: logisticsWhere
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      count: hives.count,
      data: hives.rows,
      pagination: {
        total: hives.count,
        limit: Number(limit),
        offset: Number(offset),
        pages: Math.ceil(hives.count / Number(limit)),
        currentPage: Math.floor(Number(offset) / Number(limit)) + 1
      }
    });
  } catch (error) {
    console.error('Error fetching logistics hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch logistics requests'
    });
  }
};
