import { Request, Response, NextFunction } from 'express';
import { Hive, HiveType, AcademiaHive } from '../models';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

// Create a new Academia Hive
export const createAcademiaHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { 
      title, 
      description, 
      price,
      subject,
      courseCode,
      academicLevel,
      sessionFormat,
      tutorQualifications,
      duration,
      learningGoals,
      location
    } = req.body;
    
    // Find the Academia hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Academia' },
      transaction
    });
    
    if (!hiveType) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Academia hive type not found'
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
    
    // Create academia specific details
    await AcademiaHive.create({
      hiveId: hive.id,
      subject,
      courseCode,
      academicLevel,
      sessionFormat,
      tutorQualifications,
      duration,
      learningGoals,
      location
    }, { transaction });
    
    await transaction.commit();
    
    // Fetch the complete hive with details
    const completeHive = await Hive.findByPk(hive.id, {
      include: [
        { model: HiveType },
        { 
          model: AcademiaHive,
          as: 'academiaDetails'
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Academia post created successfully',
      data: completeHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating academia hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create academia post'
    });
  }
};

// Update an Academia Hive
export const updateAcademiaHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { 
      title, 
      description, 
      price,
      subject,
      courseCode,
      academicLevel,
      sessionFormat,
      tutorQualifications,
      duration,
      learningGoals,
      location
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
        message: 'You are not authorized to update this post'
      });
      return;
    }
    
    // Update main hive record
    if (title) hive.title = title;
    if (description) hive.description = description;
    if (price) hive.price = price;
    
    await hive.save({ transaction });
    
    // Find and update academia details
    const academiaDetails = await AcademiaHive.findOne({
      where: { hiveId: id },
      transaction
    });
    
    if (!academiaDetails) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Academia details not found'
      });
      return;
    }
    
    // Update academia specific fields
    if (subject) academiaDetails.subject = subject;
    if (courseCode) academiaDetails.courseCode = courseCode;
    if (academicLevel) academiaDetails.academicLevel = academicLevel;
    if (sessionFormat) academiaDetails.sessionFormat = sessionFormat;
    if (tutorQualifications) academiaDetails.tutorQualifications = tutorQualifications;
    if (duration) academiaDetails.duration = duration;
    if (learningGoals) academiaDetails.learningGoals = learningGoals;
    if (location) academiaDetails.location = location;
    
    await academiaDetails.save({ transaction });
    
    await transaction.commit();
    
    // Fetch the updated hive with details
    const updatedHive = await Hive.findByPk(id, {
      include: [
        { model: HiveType },
        { 
          model: AcademiaHive,
          as: 'academiaDetails'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Academia post updated successfully',
      data: updatedHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating academia hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update academia post'
    });
  }
};

// Get all Academia Hives with filter options
export const getAllAcademiaHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      subject, 
      academicLevel, 
      sessionFormat,
      minPrice, 
      maxPrice,
      search,
      limit = 10,
      offset = 0
    } = req.query;
    
    // Find the Academia hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Academia' }
    });
    
    if (!hiveType) {
      res.status(404).json({
        status: 'error',
        message: 'Academia hive type not found'
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
    
    const academiaWhere: any = {};
    
    // Apply academia-specific filters
    if (subject) {
      academiaWhere.subject = subject;
    }
    
    if (academicLevel) {
      academiaWhere.academicLevel = academicLevel;
    }
    
    if (sessionFormat) {
      academiaWhere.sessionFormat = sessionFormat;
    }
    
    const hives = await Hive.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      include: [
        { model: HiveType },
        { 
          model: AcademiaHive,
          as: 'academiaDetails',
          where: academiaWhere
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
    console.error('Error fetching academia hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch academia posts'
    });
  }
};
