import { sequelize } from '../config/database';
import { Hive, HiveType } from '../models';
import setupAssociations from '../models';
import { faker } from '@faker-js/faker';

const HIVES_PER_TYPE = 20;
const TEST_USER_ID = '94b5997b-7607-4707-a93b-a17897c1ec4c';

const essentialsItems = [
  { item: 'Rice Cooker', priceRange: [25, 45] },
  { item: 'Mini Fridge', priceRange: [150, 300] },
  { item: 'Study Lamp', priceRange: [15, 35] },
  { item: 'Textbooks', priceRange: [20, 80] },
  { item: 'Scientific Calculator', priceRange: [50, 120] },
  { item: 'Desk Chair', priceRange: [60, 150] },
  { item: 'Electric Kettle', priceRange: [20, 45] },
  { item: 'Microwave Oven', priceRange: [80, 150] },
  { item: 'Laptop Stand', priceRange: [15, 40] },
  { item: 'Power Bank', priceRange: [25, 60] }
];

const academicSubjects = [
  'Calculus', 'Physics', 'Chemistry', 'Computer Science',
  'Economics', 'Statistics', 'Biology', 'Engineering',
  'Business Administration', 'Accounting'
];

const logisticsServices = [
  { service: 'Food Delivery', priceRange: [5, 15] },
  { service: 'Laundry Pickup', priceRange: [8, 20] },
  { service: 'Campus Package Delivery', priceRange: [10, 25] },
  { service: 'Grocery Shopping', priceRange: [15, 30] },
  { service: 'Library Book Return', priceRange: [5, 12] }
];

const buzzEvents = [
  'Tech Career Workshop', 'Business Networking Event',
  'Cultural Festival', 'Sports Tournament', 'Coding Competition',
  'Art Exhibition', 'Music Concert', 'Academic Conference',
  'Job Fair', 'Entrepreneurship Seminar'
];

const archiveResources = [
  'Past Exam Papers', 'Lecture Notes', 'Study Guides',
  'Research Papers', 'Project Templates', 'Lab Reports',
  'Assignment Solutions', 'Course Outlines', 'Practice Problems',
  'Tutorial Videos'
];

const sideHustleJobs = [
  { job: 'Graphic Designer', priceRange: [50, 200] },
  { job: 'Content Writer', priceRange: [30, 150] },
  { job: 'Web Developer', priceRange: [100, 500] },
  { job: 'Social Media Manager', priceRange: [80, 300] },
  { job: 'Video Editor', priceRange: [60, 250] },
  { job: 'Virtual Assistant', priceRange: [40, 200] },
  { job: 'Data Entry', priceRange: [20, 100] },
  { job: 'Translation Services', priceRange: [50, 200] },
  { job: 'Research Assistant', priceRange: [40, 150] },
  { job: 'Programming Tutor', priceRange: [30, 100] }
];

const statuses = ['open', 'assigned', 'completed', 'cancelled'];
const statusWeights = [0.7, 0.1, 0.15, 0.05];

async function seedHives() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    
    console.log('Setting up associations...');
    setupAssociations();
    
    console.log('Getting existing hives count...');
    const existingCount = await Hive.count();
    console.log(`Found ${existingCount} existing hives`);

    const hiveTypes = await HiveType.findAll();

    for (const hiveType of hiveTypes) {
      console.log(`Creating additional hives for type: ${hiveType.name}`);
      
      for (let i = 0; i < HIVES_PER_TYPE; i++) {
        const status = faker.helpers.weightedArrayElement(
          statuses.map((status, index) => ({
            value: status,
            weight: statusWeights[index]
          }))
        );

        let title, description, price;

        switch (hiveType.name) {
          case 'Essentials':
            const item = faker.helpers.arrayElement(essentialsItems);
            title = `${faker.helpers.arrayElement(['Used', 'Like New', 'Good Condition'])} ${item.item} for Sale`;
            description = faker.lorem.paragraph();
            price = faker.number.float({ 
              min: item.priceRange[0], 
              max: item.priceRange[1], 
              fractionDigits: 2 
            });
            break;

          case 'Academia':
            const subject = faker.helpers.arrayElement(academicSubjects);
            title = `${subject} ${faker.helpers.arrayElement(['Tutoring', 'Study Group', 'Exam Prep'])}`;
            description = `Offering help with ${subject}. ${faker.lorem.paragraph()}`;
            price = faker.number.float({ 
              min: 25, 
              max: 75, 
              fractionDigits: 2 
            });
            break;

          case 'Logistics':
            const logistics = faker.helpers.arrayElement(logisticsServices);
            title = `${logistics.service} - ${faker.helpers.arrayElement(['Urgent', 'Available Now', 'Flexible Time'])}`;
            description = `${faker.lorem.paragraph()} Location: ${faker.location.streetAddress()}`;
            price = faker.number.float({ 
              min: logistics.priceRange[0], 
              max: logistics.priceRange[1], 
              fractionDigits: 2 
            });
            break;

          case 'Buzz':
            const event = faker.helpers.arrayElement(buzzEvents);
            title = `${event} - ${faker.helpers.arrayElement(['Free Food!', 'Limited Spots', 'RSVP Required'])}`;
            description = `Join us for this exciting event! ${faker.lorem.paragraph()}
              Date: ${faker.date.future().toLocaleDateString()}
              Venue: ${faker.location.streetAddress()}`;
            price = 0;
            break;

          case 'Archive':
            const resource = faker.helpers.arrayElement(archiveResources);
            const course = faker.helpers.arrayElement(['CS101', 'MATH201', 'PHYS301', 'CHEM202', 'BIO101']);
            title = `${course} - ${resource}`;
            description = `High-quality ${resource.toLowerCase()} for ${course}. ${faker.lorem.paragraph()}
              Semester: ${faker.helpers.arrayElement(['Fall 2023', 'Spring 2024', 'Summer 2023'])}`;
            price = faker.helpers.arrayElement([0, 5, 10]); // Some resources are free, others paid
            break;

          case 'SideHustle':
            const job = faker.helpers.arrayElement(sideHustleJobs);
            title = `${faker.helpers.arrayElement(['Urgent:', 'Looking for:', 'Need:'])} ${job.job}`;
            description = `${faker.lorem.paragraph()}
              Required Skills: ${faker.lorem.words(3)}
              Duration: ${faker.helpers.arrayElement(['1 week', '2 weeks', '1 month', 'Ongoing'])}`;
            price = faker.number.float({ 
              min: job.priceRange[0], 
              max: job.priceRange[1], 
              fractionDigits: 2 
            });
            break;

          default:
            title = faker.lorem.sentence();
            description = faker.lorem.paragraph();
            price = 0;
        }

        // Add future date for new entries to appear at top
        const futureDate = faker.date.future({ years: 2 });
        
        await Hive.create({
          title,
          description,
          hiveTypeId: hiveType.id,
          price,
          status,
          postedById: TEST_USER_ID,
          assignedToId: status === 'assigned' || status === 'completed' ? 
            '94b5997b-7607-4707-a93b-a17897c1ec4c' : null,
          deadline: faker.date.future(),
          createdAt: futureDate,
          updatedAt: futureDate
        }).catch(err => {
          console.warn(`Failed to create hive: ${title}`, err.message);
        });
      }
    }

    const newCount = await Hive.count();
    console.log(`✅ Added ${newCount - existingCount} new hives successfully!`);
    console.log(`Total hives in database: ${newCount}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding hives:', error);
    process.exit(1);
  }
}

seedHives();
