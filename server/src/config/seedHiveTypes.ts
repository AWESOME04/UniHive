import { HiveType } from '../models/HiveType';
import { sequelize } from './database';
import setupAssociations from '../models';

async function seedHiveTypes() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established.');

    console.log('Setting up associations...');
    setupAssociations();
    
    console.log('Syncing models with database...');
    await sequelize.sync({ alter: true });
    
    console.log('Checking if hive types already exist...');
    const count = await HiveType.count();
    
    if (count > 0) {
      console.log('Hive types already exist, skipping seed.');
      process.exit(0);
      return;
    }
    
    console.log('Seeding hive types...');
    await HiveType.bulkCreate([
      {
        name: 'Essentials',
        description: 'For used items like rice cookers, electric stoves, shoes, books, etc.',
        icon: 'shopping-bag'
      },
      {
        name: 'Academia',
        description: 'Tutoring, mentoring, peer teaching, group studies.',
        icon: 'book'
      },
      {
        name: 'Logistics',
        description: 'Delivery requests, pick-ups, laundry runs, etc.',
        icon: 'truck'
      },
      {
        name: 'Buzz',
        description: 'Promoting student businesses, event listings, club activities.',
        icon: 'megaphone'
      },
      {
        name: 'Archive',
        description: 'Lecture notes, past questions, resources, templates.',
        icon: 'archive'
      },
      {
        name: 'SideHustle',
        description: 'Side gigs, freelance tasks, part-time work.',
        icon: 'briefcase'
      }
    ]);
    
    console.log('✅ Hive types seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding hive types:', error);
    process.exit(1);
  }
}

seedHiveTypes();
