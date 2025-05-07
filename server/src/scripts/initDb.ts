import { sequelize } from '../config/database';
import setupAssociations from '../models';
import dotenv from 'dotenv';
import { HiveType } from '../models';

dotenv.config();

// Initialize default hive types
const initHiveTypes = async () => {
  const types = [
    { name: 'Essentials', description: 'Buy and sell used items' },
    { name: 'Academia', description: 'Academic help and tutoring' },
    { name: 'Logistics', description: 'Delivery and errand services' },
    { name: 'Buzz', description: 'Campus events and activities' },
    { name: 'Archive', description: 'Academic resources and materials' },
    { name: 'SideHustle', description: 'Gigs and part-time opportunities' }
  ];

  try {
    for (const type of types) {
      await HiveType.findOrCreate({
        where: { name: type.name },
        defaults: type
      });
    }
    console.log('Default hive types initialized');
  } catch (error) {
    console.error('Error initializing hive types:', error);
  }
};

// Main initialization function
async function initializeDatabase() {
  try {
    console.log('Attempting database connection...');
    await sequelize.authenticate();
    console.log('Database connection successful.');
    
    console.log('Setting up model associations...');
    setupAssociations();
    
    console.log('Synchronizing database models (without dropping tables)...');
    // Use { force: false } to prevent dropping tables
    await sequelize.sync({ force: false });
    
    // Initialize default data
    await initHiveTypes();
    
    console.log('✅ Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase();
