import { Request, Response, NextFunction } from 'express';
import { Hive, HiveType, ArchiveHive } from '../models';
import { sequelize } from '../config/database';
import { Op } from 'sequelize';

// Create a new Archive Hive
export const createArchiveHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { 
      title, 
      description,
      courseCode,
      resourceType,
      professor,
      semester,
      year,
      fileFormat,
      fileUrl
    } = req.body;
    
    // Find the Archive hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Archive' },
      transaction
    });
    
    if (!hiveType) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Archive hive type not found'
      });
      return;
    }
    
    // Create main hive record
    const hive = await Hive.create({
      title,
      description,
      price: 0,
      status: 'open',
      postedById: userId,
      hiveTypeId: hiveType.id
    }, { transaction });
    
    // Create archive specific details
    await ArchiveHive.create({
      hiveId: hive.id,
      courseCode,
      resourceType,
      professor,
      semester,
      year,
      fileFormat,
      fileUrl,
      downloadCount: 0,
      rating: 0
    }, { transaction });
    
    await transaction.commit();
    
    // Fetch the complete hive with details
    const completeHive = await Hive.findByPk(hive.id, {
      include: [
        { model: HiveType },
        { 
          model: ArchiveHive,
          as: 'archiveDetails'
        }
      ]
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Archive resource created successfully',
      data: completeHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating archive hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create archive resource'
    });
  }
};

// Update an Archive Hive
export const updateArchiveHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { 
      title, 
      description,
      courseCode,
      resourceType,
      professor,
      semester,
      year,
      fileFormat,
      fileUrl
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
        message: 'You are not authorized to update this resource'
      });
      return;
    }
    
    // Update main hive record
    if (title) hive.title = title;
    if (description) hive.description = description;
    
    await hive.save({ transaction });
    
    // Find and update archive details
    const archiveDetails = await ArchiveHive.findOne({
      where: { hiveId: id },
      transaction
    });
    
    if (!archiveDetails) {
      await transaction.rollback();
      res.status(404).json({
        status: 'error',
        message: 'Archive details not found'
      });
      return;
    }
    
    // Update archive specific fields
    if (courseCode) archiveDetails.courseCode = courseCode;
    if (resourceType) archiveDetails.resourceType = resourceType;
    if (professor) archiveDetails.professor = professor;
    if (semester) archiveDetails.semester = semester;
    if (year) archiveDetails.year = year;
    if (fileFormat) archiveDetails.fileFormat = fileFormat;
    if (fileUrl) archiveDetails.fileUrl = fileUrl;
    
    await archiveDetails.save({ transaction });
    
    await transaction.commit();
    
    // Fetch the updated hive with details
    const updatedHive = await Hive.findByPk(id, {
      include: [
        { model: HiveType },
        { 
          model: ArchiveHive,
          as: 'archiveDetails'
        }
      ]
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Archive resource updated successfully',
      data: updatedHive
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating archive hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update archive resource'
    });
  }
};

// Get all Archive Hives with filter options
export const getAllArchiveHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      courseCode, 
      resourceType, 
      professor,
      search,
      limit = 10,
      offset = 0
    } = req.query;
    
    // Find the Archive hive type
    const hiveType = await HiveType.findOne({
      where: { name: 'Archive' }
    });
    
    if (!hiveType) {
      res.status(404).json({
        status: 'error',
        message: 'Archive hive type not found'
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
    
    const archiveWhere: any = {};
    
    // Filter by courseCode
    if (courseCode) {
      archiveWhere.courseCode = courseCode;
    }
    
    // Filter by resourceType
    if (resourceType) {
      archiveWhere.resourceType = resourceType;
    }
    
    // Filter by professor
    if (professor) {
      archiveWhere.professor = { [Op.iLike]: `%${professor}%` };
    }
    
    const hives = await Hive.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      include: [
        { model: HiveType },
        { 
          model: ArchiveHive,
          as: 'archiveDetails',
          where: archiveWhere
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
    console.error('Error fetching archive hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch archive resources'
    });
  }
};
