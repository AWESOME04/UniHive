import dotenv from 'dotenv';
import { sequelize } from '../config/database';
import { Hive, User } from '../models';
import setupAssociations from '../models/index';
import { QueryTypes } from 'sequelize';

dotenv.config();

/**
 * This script fixes inconsistent foreign key relationships in the database:
 * 1. Identifies hives with non-existent postedById references
 * 2. Provides options to:
 *    - Update them to reference existing users
 *    - Remove inconsistent records
 */
const fixForeignKeys = async () => {
  try {
    // Connect to database
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection successful!');
    
    // Setup associations
    setupAssociations();
    console.log('Model associations initialized.');
    
    // Find problematic hives with non-existent users
    const problematicHives = await sequelize.query(
      `SELECT h.id, h."postedById" 
       FROM hives h 
       LEFT JOIN users u ON h."postedById" = u.id 
       WHERE h."postedById" IS NOT NULL AND u.id IS NULL`,
      { type: QueryTypes.SELECT }
    ) as Array<{ id: string, postedById: string }>;
    
    console.log(`Found ${problematicHives.length} hives with invalid postedById references`);
    
    if (problematicHives.length === 0) {
      console.log('No issues found. Database foreign keys are consistent.');
      process.exit(0);
      return;
    }
    
    // Get a list of valid users to reassign hives
    const validUsers = await User.findAll({
      attributes: ['id'],
      limit: 5
    });
    
    if (validUsers.length === 0) {
      console.log('No valid users found to reassign hives. Please create users first.');
      process.exit(1);
      return;
    }
    
    // Decide which user to reassign hives to (using first valid user)
    const targetUserId = validUsers[0].id;
    console.log(`Will reassign problematic hives to user ID: ${targetUserId}`);
    
    // Reassign or delete problematic hives
    const problematicHiveIds = problematicHives.map((h) => h.id);
    
    // Option 1: Update postedById to valid user
    console.log('Updating problematic hives with valid user reference...');
    const [updatedCount] = await Hive.update(
      { postedById: targetUserId },
      { where: { id: problematicHiveIds } }
    );
    
    // Option 2: Alternative - delete problematic records
    // Uncomment this if you prefer to delete these records
    /*
    console.log('Deleting problematic hives...');
    const deletedCount = await Hive.destroy({
      where: { id: problematicHiveIds }
    });
    console.log(`Deleted ${deletedCount} problematic hives`);
    */
    
    console.log(`Updated ${updatedCount} hives to reference valid user ID: ${targetUserId}`);
    console.log('Foreign key fix completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing foreign keys:', error);
    process.exit(1);
  }
};

fixForeignKeys();
