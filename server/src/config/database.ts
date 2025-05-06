import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { OTP } from '../models/OTP';

dotenv.config();

// Use connection string if provided, otherwise use individual parameters
const connectionString = process.env.DATABASE_URL;

let sequelizeConfig: any;

if (connectionString) {
  // Use connection string (for Neon PostgreSQL)
  sequelizeConfig = {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  };
} else {
  // Fallback to individual parameters
  const {
    DB_HOST = 'localhost',
    DB_USER = 'postgres',
    DB_PASS = 'postgres',
    DB_NAME = 'unihive_db',
    DB_PORT = '5432',
  } = process.env;

  sequelizeConfig = {
    dialect: 'postgres',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: parseInt(DB_PORT, 10),
    logging: false
  };
}

// Create and export the sequelize instance
const sequelize = connectionString 
  ? new Sequelize(connectionString, sequelizeConfig)
  : new Sequelize(sequelizeConfig);

// Add models explicitly - this is the most reliable way
sequelize.addModels([User, OTP]);

export { sequelize };
