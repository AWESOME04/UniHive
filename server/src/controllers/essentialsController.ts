import { Request, Response, NextFunction } from 'express';
import { Hive, HiveType, EssentialsHive } from '../models';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

// Create a new Essentials Hive with image upload support
export const createEssentialsHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { 
      title, 
      description, 
      price,
      condition,
      brand,
      purchaseDate,
      itemCategory,
      photos,
      pickupLocation
    } = req.body;
    
    // Find the Essentials hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Essentials' },
      transaction
    });
    
    if (!hiveType) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Essentials hive type not found'
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
    
    // Create essentials specific details
    await EssentialsHive.create({
      hiveId: hive.id,
      condition,
      brand,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
      itemCategory,
      photos: Array.isArray(photos) ? photos : photos ? [photos] : [],
      pickupLocation
    }, { transaction });
    
    await transaction.commit();
    
    // Fetch the complete hive with details
    const completeHive = await Hive.findByPk(hive.id, {
      include: [
        { model: HiveType },
        { 
          model: EssentialsHive,
          as: 'essentialsDetails'
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Essentials listing created successfully',
      data: completeHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating essentials hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create essentials listing'
    });
  }
};

// Update an Essentials Hive
export const updateEssentialsHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { 
      title, 
      description, 
      price,
      condition,
      brand,
      purchaseDate,
      itemCategory,
      photos,
      pickupLocation
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
        message: 'You are not authorized to update this listing'
      });
      return;
    }
    
    // Update main hive record
    if (title) hive.title = title;
    if (description) hive.description = description;
    if (price) hive.price = price;
    
    await hive.save({ transaction });
    
    // Find and update essentials details
    const essentialsDetails = await EssentialsHive.findOne({
      where: { hiveId: id },
      transaction
    });
    
    if (!essentialsDetails) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Essentials details not found'
      });
      return;
    }
    
    // Update essentials specific fields
    if (condition) essentialsDetails.condition = condition;
    if (brand) essentialsDetails.brand = brand;
    if (purchaseDate) essentialsDetails.purchaseDate = new Date(purchaseDate);
    if (itemCategory) essentialsDetails.itemCategory = itemCategory;
    if (photos) essentialsDetails.photos = photos;
    if (pickupLocation) essentialsDetails.pickupLocation = pickupLocation;
    
    await essentialsDetails.save({ transaction });
    
    await transaction.commit();
    
    // Fetch the updated hive with details
    const updatedHive = await Hive.findByPk(id, {
      include: [
        { model: HiveType },
        { 
          model: EssentialsHive,
          as: 'essentialsDetails'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Essentials listing updated successfully',
      data: updatedHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating essentials hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update essentials listing'
    });
  }
};

// Get all Essentials Hives with filter options
export const getAllEssentialsHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      condition, 
      itemCategory, 
      minPrice, 
      maxPrice,
      search,
      limit = 10,
      offset = 0
    } = req.query;
    
    // Find the Essentials hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Essentials' }
    });
    
    if (!hiveType) {
      res.status(404).json({
        status: 'error',
        message: 'Essentials hive type not found'
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
    
    const essentialsWhere: any = {};
    
    // Filter by condition
    if (condition) {
      essentialsWhere.condition = condition;
    }
    
    // Filter by item category
    if (itemCategory) {
      essentialsWhere.itemCategory = itemCategory;
    }
    
    const hives = await Hive.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      include: [
        { model: HiveType },
        { 
          model: EssentialsHive,
          as: 'essentialsDetails',
          where: essentialsWhere
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
    console.error('Error fetching essentials hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch essentials listings'
    });
  }
};
