import { sequelize } from '../config/database';

// Import models - don't define associations yet
import { User } from './User';
import { OTP } from './OTP';

// Initialize models with sequelize instance
const models = {
  User,
  OTP,
};

// Set up associations
const setupAssociations = () => {
  // One-to-many relationship between User and OTP
  User.hasMany(OTP, { 
    foreignKey: 'userId', 
    as: 'otps',
    onDelete: 'CASCADE' 
  });
  
  OTP.belongsTo(User, { 
    foreignKey: 'userId', 
    as: 'user' 
  });
};

// Export models
export {
  User,
  OTP
};

// Default export for setupAssociations
export default setupAssociations;
