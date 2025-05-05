import { sequelize } from './database';

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    await sequelize.sync({ alter: false });
    console.log('✅ Models synchronized successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database or sync models:', error);
    process.exit(1);
  }
}

console.log('Testing database connection...');
testConnection();
