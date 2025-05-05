import { sequelize } from './database';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  try {
    const forceSync = process.env.NODE_ENV === 'development' && process.env.DB_FORCE_SYNC === 'true';
    
    await sequelize.sync({ force: forceSync });
    console.log('Database synchronized successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
