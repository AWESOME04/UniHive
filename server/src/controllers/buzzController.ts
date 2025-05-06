import { Request, Response, NextFunction } from 'express';
import { Hive, HiveType, BuzzHive } from '../models';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

// Create a new Buzz Hive
export const createBuzzHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { 
      title, 
      description,
      eventDate,
      location,
      organizer,
      eventType,
      admission,
      capacity,
      registrationLink,
      promotionalImage
    } = req.body;
    
    // Find the Buzz hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Buzz' },
      transaction
    });
    
    if (!hiveType) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Buzz hive type not found'
      });
      return;
    }
    
    // Create main hive record
    const hive = await Hive.create({
      title,
      description,
      price: 0, // Most events are free to post
      status: 'open',
      postedById: userId,
      hiveTypeId: hiveType.id
    }, { transaction });
    
    // Create buzz specific details
    await BuzzHive.create({
      hiveId: hive.id,
      eventDate: new Date(eventDate),
      location,
      organizer,
      eventType,
      admission,
      capacity: capacity || null,
      registrationLink,
      promotionalImage
    }, { transaction });
    
    await transaction.commit();
    
    // Fetch the complete hive with details
    const completeHive = await Hive.findByPk(hive.id, {
      include: [
        { model: HiveType },
        { 
          model: BuzzHive,
          as: 'buzzDetails'
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Event created successfully',
      data: completeHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating buzz hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create event'
    });
  }
};

// Update a Buzz Hive
export const updateBuzzHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { 
      title, 
      description,
      eventDate,
      location,
      organizer,
      eventType,
      admission,
      capacity,
      registrationLink,
      promotionalImage
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
        message: 'You are not authorized to update this event'
      });
      return;
    }
    
    // Update main hive record
    if (title) hive.title = title;
    if (description) hive.description = description;
    
    await hive.save({ transaction });
    
    // Find and update buzz details
    const buzzDetails = await BuzzHive.findOne({
      where: { hiveId: id },
      transaction
    });
    
    if (!buzzDetails) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Event details not found'
      });
      return;
    }
    
    // Update buzz specific fields
    if (eventDate) buzzDetails.eventDate = new Date(eventDate);
    if (location) buzzDetails.location = location;
    if (organizer) buzzDetails.organizer = organizer;
    if (eventType) buzzDetails.eventType = eventType;
    if (admission) buzzDetails.admission = admission;
    if (capacity !== undefined) buzzDetails.capacity = capacity;
    if (registrationLink) buzzDetails.registrationLink = registrationLink;
    if (promotionalImage) buzzDetails.promotionalImage = promotionalImage;
    
    await buzzDetails.save({ transaction });
    
    await transaction.commit();
    
    // Fetch the updated hive with details
    const updatedHive = await Hive.findByPk(id, {
      include: [
        { model: HiveType },
        { 
          model: BuzzHive,
          as: 'buzzDetails'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Event updated successfully',
      data: updatedHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating buzz hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update event'
    });
  }
};

// Get all Buzz Hives with filter options
export const getAllBuzzHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      eventType, 
      admission, 
      fromDate,
      toDate,
      search,
      limit = 10,
      offset = 0
    } = req.query;
    
    // Find the Buzz hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Buzz' }
    });
    
    if (!hiveType) {
      res.status(404).json({
        status: 'error',
        message: 'Buzz hive type not found'
      });
      return;
    }
    
    const whereClause: any = {
      hiveTypeId: hiveType.id
    };
    
    // Search in title or description
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    const buzzWhere: any = {};
    
    // Apply buzz-specific filters
    if (eventType) {
      buzzWhere.eventType = eventType;
    }
    
    if (admission) {
      buzzWhere.admission = admission;
    }
    
    // Filter by date range
    if (fromDate || toDate) {
      buzzWhere.eventDate = {};
      if (fromDate) buzzWhere.eventDate[Op.gte] = new Date(fromDate as string);
      if (toDate) buzzWhere.eventDate[Op.lte] = new Date(toDate as string);
    }
    
    const hives = await Hive.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      include: [
        { model: HiveType },
        { 
          model: BuzzHive,
          as: 'buzzDetails',
          where: buzzWhere
        }
      ],
      order: [[sequelize.literal('"buzzDetails"."eventDate"'), 'ASC']]
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
    console.error('Error fetching buzz hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch events'
    });
  }
};
