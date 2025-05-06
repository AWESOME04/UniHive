import { Request, Response, NextFunction } from 'express';
import { Hive, HiveApplication, User, HiveType } from '../models';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

// Apply to a hive
export const applyToHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { hiveId } = req.params;
    const userId = req.user.id;
    const { message } = req.body;
    
    // Find the hive
    const hive = await Hive.findByPk(hiveId);
    
    if (!hive) {
      res.status(404).json({
        status: 'error',
        message: 'Hive not found'
      });
      return;
    }
    
    // Check if user is applying to their own hive
    if (hive.postedById === userId) {
      res.status(400).json({
        status: 'error',
        message: 'You cannot apply to your own hive'
      });
      return;
    }
    
    // Check if user has already applied
    const existingApplication = await HiveApplication.findOne({
      where: {
        hiveId,
        applicantId: userId
      }
    });
    
    if (existingApplication) {
      res.status(400).json({
        status: 'error',
        message: 'You have already applied to this hive'
      });
      return;
    }
    
    // Create the application
    const application = await HiveApplication.create({
      hiveId,
      applicantId: userId,
      message: message || '',
      status: 'pending'
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Apply to hive error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit application'
    });
  }
};

// Get all applications for a hive (for the poster)
export const getHiveApplications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { hiveId } = req.params;
    const userId = req.user.id;
    
    // Find the hive
    const hive = await Hive.findByPk(hiveId);
    
    if (!hive) {
      res.status(404).json({
        status: 'error',
        message: 'Hive not found'
      });
      return;
    }
    
    // Check if user is the poster
    if (hive.postedById !== userId) {
      res.status(403).json({
        status: 'error',
        message: 'You are not authorized to view applications for this hive'
      });
      return;
    }
    
    // Get all applications
    const applications = await HiveApplication.findAll({
      where: { hiveId },
      include: [
        {
          model: User,
          as: 'applicantUser',
          attributes: ['id', 'name', 'email', 'university', 'profileImage', 'rating']
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error('Get hive applications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch applications'
    });
  }
};

// Update application status (accept/reject)
export const updateApplicationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { hiveId, applicationId } = req.params;
    const userId = req.user.id;
    const { status } = req.body;
    
    if (!status || !['accepted', 'rejected'].includes(status)) {
      res.status(400).json({
        status: 'error',
        message: 'Valid status (accepted/rejected) is required'
      });
      return;
    }
    
    // Start transaction
    const transaction = await sequelize.transaction();
    
    try {
      // Find the hive
      const hive = await Hive.findByPk(hiveId, { transaction });
      
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
          message: 'You are not authorized to update applications for this hive'
        });
        return;
      }
      
      // Find the application
      const application = await HiveApplication.findOne({
        where: {
          id: applicationId,
          hiveId
        },
        transaction
      });
      
      if (!application) {
        await transaction.rollback();
        res.status(404).json({
          status: 'error',
          message: 'Application not found'
        });
        return;
      }
      
      // Update application status
      application.status = status;
      await application.save({ transaction });
      
      // If accepted, assign the hive to the applicant
      if (status === 'accepted') {
        hive.assignedToId = application.applicantId;
        hive.status = 'assigned';
        await hive.save({ transaction });
        
        // Reject all other applications
        await HiveApplication.update(
          { status: 'rejected' },
          { 
            where: { 
              hiveId,
              id: { [Op.ne]: applicationId }
            },
            transaction
          }
        );
      }
      
      await transaction.commit();
      
      res.status(200).json({
        status: 'success',
        message: `Application ${status}`,
        data: application
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update application status'
    });
  }
};

// Get current user's applications
export const getMyApplications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;
    
    const applications = await HiveApplication.findAll({
      where: { applicantId: userId },
      include: [
        {
          model: Hive,
          include: [
            {
              model: User,
              as: 'postedByUser',
              attributes: ['id', 'name', 'university']
            },
            {
              model: HiveType,
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch your applications'
    });
  }
};
