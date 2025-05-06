import { sequelize } from './database';
import setupAssociations from '../models/index';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  try {
    console.log('Attempting database connection...');
    await sequelize.authenticate();
    console.log('Database connection successful.');
    
    console.log('Setting up model associations...');
    setupAssociations();
    
    console.log('Synchronizing database models...');
    // Force sync will drop and recreate all tables
    await sequelize.sync({ force: true });
    
    console.log('✅ Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
