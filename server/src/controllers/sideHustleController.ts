import { Request, Response, NextFunction } from 'express';
import { Hive, HiveType, SideHustleHive } from '../models';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

// Create a new Side Hustle Hive
export const createSideHustleHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { 
      title, 
      description,
      price,
      skillCategory,
      estimatedHours,
      workLocation,
      compensationType,
      applicationDeadline,
      experienceLevel,
      openPositions
    } = req.body;
    
    // Find the SideHustle hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'SideHustle' },
      transaction
    });
    
    if (!hiveType) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'SideHustle hive type not found'
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
      hiveTypeId: hiveType.id
    }, { transaction });
    
    // Create side hustle specific details
    await SideHustleHive.create({
      hiveId: hive.id,
      skillCategory,
      estimatedHours: estimatedHours || null,
      workLocation,
      compensationType,
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
      experienceLevel,
      openPositions: openPositions || 1
    }, { transaction });
    
    await transaction.commit();
    
    // Fetch the complete hive with details
    const completeHive = await Hive.findByPk(hive.id, {
      include: [
        { model: HiveType },
        { 
          model: SideHustleHive,
          as: 'sideHustleDetails'
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Side hustle created successfully',
      data: completeHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating side hustle:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create side hustle'
    });
  }
};

// Update a Side Hustle Hive
export const updateSideHustleHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { 
      title, 
      description,
      price,
      skillCategory,
      estimatedHours,
      workLocation,
      compensationType,
      applicationDeadline,
      experienceLevel,
      openPositions
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
        message: 'You are not authorized to update this side hustle'
      });
      return;
    }
    
    // Update main hive record
    if (title) hive.title = title;
    if (description) hive.description = description;
    if (price !== undefined) hive.price = price;
    
    await hive.save({ transaction });
    
    // Find and update side hustle details
    const sideHustleDetails = await SideHustleHive.findOne({
      where: { hiveId: id },
      transaction
    });
    
    if (!sideHustleDetails) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Side hustle details not found'
      });
      return;
    }
    
    // Update side hustle specific fields
    if (skillCategory) sideHustleDetails.skillCategory = skillCategory;
    if (estimatedHours !== undefined) sideHustleDetails.estimatedHours = estimatedHours;
    if (workLocation) sideHustleDetails.workLocation = workLocation;
    if (compensationType) sideHustleDetails.compensationType = compensationType;
    if (applicationDeadline) sideHustleDetails.applicationDeadline = new Date(applicationDeadline);
    if (experienceLevel) sideHustleDetails.experienceLevel = experienceLevel;
    if (openPositions !== undefined) sideHustleDetails.openPositions = openPositions;
    
    await sideHustleDetails.save({ transaction });
    
    await transaction.commit();
    
    // Fetch the updated hive with details
    const updatedHive = await Hive.findByPk(id, {
      include: [
        { model: HiveType },
        { 
          model: SideHustleHive,
          as: 'sideHustleDetails'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Side hustle updated successfully',
      data: updatedHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating side hustle:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update side hustle'
    });
  }
};

// Get all Side Hustle Hives with filter options
export const getAllSideHustleHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      skillCategory, 
      workLocation, 
      experienceLevel,
      minPrice, 
      maxPrice,
      search,
      limit = 10,
      offset = 0
    } = req.query;
    
    // Find the SideHustle hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'SideHustle' }
    });
    
    if (!hiveType) {
      res.status(404).json({
        status: 'error',
        message: 'SideHustle hive type not found'
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
    
    const sideHustleWhere: any = {};
    
    // Filter by skill category
    if (skillCategory) {
      sideHustleWhere.skillCategory = skillCategory;
    }
    
    // Filter by work location
    if (workLocation) {
      sideHustleWhere.workLocation = workLocation;
    }
    
    // Filter by experience level
    if (experienceLevel) {
      sideHustleWhere.experienceLevel = experienceLevel;
    }
    
    const hives = await Hive.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      include: [
        { model: HiveType },
        { 
          model: SideHustleHive,
          as: 'sideHustleDetails',
          where: sideHustleWhere
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
    console.error('Error fetching side hustle hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch side hustles'
    });
  }
};
