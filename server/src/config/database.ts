import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { OTP } from '../models/OTP';
import { Hive } from '../models/Hive';
import { HiveType } from '../models/HiveType';
import { EssentialsHive } from '../models/EssentialsHive';
import { AcademiaHive } from '../models/AcademiaHive';
import { LogisticsHive } from '../models/LogisticsHive';
import { BuzzHive } from '../models/BuzzHive';
import { ArchiveHive } from '../models/ArchiveHive';
import { SideHustleHive } from '../models/SideHustleHive';
import { HiveApplication } from '../models/HiveApplication';
import { HiveReview } from '../models/HiveReview';
import { PasswordReset } from '../models/PasswordReset';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const frontendUrl = process.env.FRONTEND_URL || 'https://unihive.vercel.app';
console.log(`Frontend URL configured as: ${frontendUrl}`);

let sequelizeConfig: any;

if (connectionString) {
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

const sequelize = connectionString 
  ? new Sequelize(connectionString, sequelizeConfig)
  : new Sequelize(sequelizeConfig);

sequelize.addModels([
  User, 
  OTP, 
  Hive, 
  HiveType, 
  EssentialsHive, 
  AcademiaHive, 
  LogisticsHive, 
  BuzzHive, 
  ArchiveHive, 
  SideHustleHive, 
  HiveApplication, 
  HiveReview,
  PasswordReset
]);

export { sequelize };
