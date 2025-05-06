import { sequelize } from '../config/database';

import { User } from './User';
import { OTP } from './OTP';

const models = {
  User,
  OTP,
};

const setupAssociations = () => {
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

export {
  User,
  OTP
};

export default setupAssociations;
