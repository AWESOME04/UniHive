import { Request, Response, NextFunction } from 'express';
import { Hive, HiveType } from '../models';
import { Op } from 'sequelize';

// Get all hive types
export const getHiveTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hiveTypes = await HiveType.findAll();
    
    res.status(200).json({
      status: 'success',
      data: hiveTypes
    });
  } catch (error) {
    console.error('Error fetching hive types:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch hive types'
    });
  }
};

// Get all hives with filtering
export const getAllHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      type, 
      status, 
      minPrice, 
      maxPrice, 
      search,
      postedBy,
      assignedTo,
      limit = 10,
      offset = 0
    } = req.query;
    
    const whereClause: any = {};
    
    // Filter by hive type
    if (type) {
      whereClause.hiveTypeId = type;
    }
    
    // Filter by status
    if (status) {
      whereClause.status = status;
    }
    
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
    
    // Filter by poster
    if (postedBy) {
      whereClause.postedById = postedBy;
    }
    
    // Filter by assignee
    if (assignedTo) {
      whereClause.assignedToId = assignedTo;
    }
    
    const hives = await Hive.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: Number(offset),
      include: [
        { 
          model: HiveType,
          attributes: ['id', 'name', 'description', 'icon']
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
    console.error('Error fetching hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch hives'
    });
  }
};

// Get hive by ID
export const getHiveById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    const hive = await Hive.findByPk(id, {
      include: [
        { 
          model: HiveType,
          attributes: ['id', 'name', 'description', 'icon']
        }
      ]
    });
    
    if (!hive) {
      res.status(404).json({
        status: 'error',
        message: 'Hive not found'
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: hive
    });
  } catch (error) {
    console.error('Error fetching hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch hive'
    });
  }
};

// Get hives posted by current user
export const getMyPostedHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;
    
    const hives = await Hive.findAll({
      where: {
        postedById: userId
      },
      include: [
        { 
          model: HiveType,
          attributes: ['id', 'name', 'description', 'icon']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      count: hives.length,
      data: hives
    });
  } catch (error) {
    console.error('Error fetching user hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch your hives'
    });
  }
};

// Get hives assigned to current user
export const getMyAssignedHives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id;
    
    const hives = await Hive.findAll({
      where: {
        assignedToId: userId
      },
      include: [
        { 
          model: HiveType,
          attributes: ['id', 'name', 'description', 'icon']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      status: 'success',
      count: hives.length,
      data: hives
    });
  } catch (error) {
    console.error('Error fetching assigned hives:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch assigned hives'
    });
  }
};

// Delete a hive (only by poster)
export const deleteHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const hive = await Hive.findByPk(id);
    
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
        message: 'You are not authorized to delete this hive'
      });
      return;
    }
    
    // If hive is already assigned, don't allow deletion
    if (hive.status !== 'open' && hive.status !== 'cancelled') {
      res.status(400).json({
        status: 'error',
        message: `Cannot delete a hive with status '${hive.status}'`
      });
      return;
    }
    
    await hive.destroy();
    
    res.status(200).json({
      status: 'success',
      message: 'Hive deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete hive'
    });
  }
};

// Update hive status
export const updateHiveStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    
    const hive = await Hive.findByPk(id);
    
    if (!hive) {
      res.status(404).json({
        status: 'error',
        message: 'Hive not found'
      });
      return;
    }
    
    // Check permissions based on status change
    if (status === 'cancelled') {
      // Only poster or assignee can cancel
      if (hive.postedById !== userId && hive.assignedToId !== userId) {
        res.status(403).json({
          status: 'error',
          message: 'You are not authorized to cancel this hive'
        });
        return;
      }
    } else if (status === 'completed') {
      // Only assignee can mark as completed
      if (hive.assignedToId !== userId) {
        res.status(403).json({
          status: 'error',
          message: 'Only the assigned person can mark this hive as completed'
        });
        return;
      }
    } else if (status === 'confirmed') {
      // Only poster can confirm completion
      if (hive.postedById !== userId) {
        res.status(403).json({
          status: 'error',
          message: 'Only the poster can confirm completion of this hive'
        });
        return;
      }
      // Check if hive is in completed status
      if (hive.status !== 'completed') {
        res.status(400).json({
          status: 'error',
          message: 'Hive must be marked as completed before confirming'
        });
        return;
      }
    }
    
    // Update the status
    hive.status = status;
    await hive.save();
    
    res.status(200).json({
      status: 'success',
      message: `Hive status updated to ${status}`,
      data: hive
    });
  } catch (error) {
    console.error('Error updating hive status:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update hive status'
    });
  }
};

// Assign a hive to a user (only by poster)
export const assignHive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { assignedToId } = req.body;
    const userId = req.user.id;
    
    const hive = await Hive.findByPk(id);
    
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
        message: 'Only the poster can assign this hive'
      });
      return;
    }
    
    // Check if hive is open
    if (hive.status !== 'open') {
      res.status(400).json({
        status: 'error',
        message: `Cannot assign a hive with status '${hive.status}'`
      });
      return;
    }
    
    // Update the hive
    hive.assignedToId = assignedToId;
    hive.status = 'assigned';
    await hive.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Hive assigned successfully',
      data: hive
    });
  } catch (error) {
    console.error('Error assigning hive:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to assign hive'
    });
  }
};
