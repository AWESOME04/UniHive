import { sequelize } from './database';
import setupAssociations from '../models/index';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

async function resetDatabase() {
  try {
    console.log('Attempting database connection...');
    await sequelize.authenticate();
    console.log('Database connection successful.');
    
    console.log('Setting up model associations...');
    setupAssociations();
    
    console.log('Dropping and recreating all tables...');
    await sequelize.sync({ force: true });
    
    console.log('Creating test data...');
    await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: '$2b$10$i8.pGrdg6zhvW8HU7y2ueeyX.xFaa4TqQm4gK0QJF.YH9eUZ9dBzC', // password: admin123
      isVerified: true
    });
    
    console.log('✅ Database reset completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    process.exit(1);
  }
}

resetDatabase();
