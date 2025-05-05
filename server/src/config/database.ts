import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from '../models';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  models: [User]
});

export { sequelize };
