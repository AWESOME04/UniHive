import { sequelize } from '../config/database';

import { User } from './User';
import { OTP } from './OTP';
import { Hive } from './Hive';
import { HiveType } from './HiveType';
import { EssentialsHive } from './EssentialsHive';
import { AcademiaHive } from './AcademiaHive';
import { LogisticsHive } from './LogisticsHive';
import { BuzzHive } from './BuzzHive';
import { ArchiveHive } from './ArchiveHive';
import { SideHustleHive } from './SideHustleHive';
import { HiveApplication } from './HiveApplication';
import { HiveReview } from './HiveReview';
import { PasswordReset } from './PasswordReset';
import { Transaction } from './Transaction';
import { Conversation } from './Conversation';
import { Message } from './Message';

const models = {
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
  PasswordReset,
  Transaction,
  Conversation,
  Message
};

const setupAssociations = () => {
  // User associations
  User.hasMany(OTP, { 
    foreignKey: 'userId', 
    as: 'otps',
    onDelete: 'CASCADE' 
  });
  
  OTP.belongsTo(User, { 
    foreignKey: 'userId', 
    as: 'user' 
  });

  // Hive associations
  HiveType.hasMany(Hive, { 
    foreignKey: 'hiveTypeId'
  });
  
  Hive.belongsTo(HiveType, { 
    foreignKey: 'hiveTypeId' 
  });

  User.hasMany(Hive, { 
    foreignKey: 'postedById', 
    as: 'postedHives' 
  });
  
  Hive.belongsTo(User, { 
    foreignKey: 'postedById', 
    as: 'postedByUser' 
  });

  User.hasMany(Hive, { 
    foreignKey: 'assignedToId', 
    as: 'assignedHives' 
  });
  
  Hive.belongsTo(User, { 
    foreignKey: 'assignedToId', 
    as: 'assignedToUser' 
  });

  // Hive type-specific associations
  Hive.hasOne(EssentialsHive, { 
    foreignKey: 'hiveId', 
    as: 'essentialsDetails' 
  });
  
  EssentialsHive.belongsTo(Hive, { 
    foreignKey: 'hiveId' 
  });

  Hive.hasOne(AcademiaHive, { 
    foreignKey: 'hiveId', 
    as: 'academiaDetails' 
  });
  
  AcademiaHive.belongsTo(Hive, { 
    foreignKey: 'hiveId' 
  });

  Hive.hasOne(LogisticsHive, { 
    foreignKey: 'hiveId', 
    as: 'logisticsDetails' 
  });
  
  LogisticsHive.belongsTo(Hive, { 
    foreignKey: 'hiveId' 
  });

  Hive.hasOne(BuzzHive, { 
    foreignKey: 'hiveId', 
    as: 'buzzDetails' 
  });
  
  BuzzHive.belongsTo(Hive, { 
    foreignKey: 'hiveId' 
  });

  Hive.hasOne(ArchiveHive, { 
    foreignKey: 'hiveId', 
    as: 'archiveDetails' 
  });
  
  ArchiveHive.belongsTo(Hive, { 
    foreignKey: 'hiveId' 
  });

  Hive.hasOne(SideHustleHive, { 
    foreignKey: 'hiveId', 
    as: 'sideHustleDetails' 
  });
  
  SideHustleHive.belongsTo(Hive, { 
    foreignKey: 'hiveId' 
  });

  Hive.hasMany(HiveApplication, { 
    foreignKey: 'hiveId', 
    as: 'applications' 
  });
  
  HiveApplication.belongsTo(Hive, { 
    foreignKey: 'hiveId' 
  });

  User.hasMany(HiveApplication, { 
    foreignKey: 'applicantId', 
    as: 'userApplications' 
  });
  
  HiveApplication.belongsTo(User, { 
    foreignKey: 'applicantId', 
    as: 'applicantUser'
  });

  Hive.hasMany(HiveReview, { 
    foreignKey: 'hiveId', 
    as: 'reviews' 
  });
  
  HiveReview.belongsTo(Hive, { 
    foreignKey: 'hiveId' 
  });

  User.hasMany(HiveReview, { 
    foreignKey: 'reviewerId', 
    as: 'givenReviews' 
  });
  
  HiveReview.belongsTo(User, { 
    foreignKey: 'reviewerId', 
    as: 'reviewerUser'
  });

  User.hasMany(HiveReview, { 
    foreignKey: 'reviewedId', 
    as: 'receivedReviews' 
  });
  
  HiveReview.belongsTo(User, { 
    foreignKey: 'reviewedId', 
    as: 'reviewedUser'
  });

  User.hasMany(PasswordReset, {
    foreignKey: 'userId',
    as: 'passwordResets',
    onDelete: 'CASCADE'
  });

  PasswordReset.belongsTo(User, {
    foreignKey: 'userId'
  });

  User.hasMany(Transaction, { 
    foreignKey: 'buyerId', 
    as: 'userPurchases' 
  });
  
  User.hasMany(Transaction, { 
    foreignKey: 'sellerId', 
    as: 'userSales' 
  });
  
  Hive.hasMany(Transaction, { 
    foreignKey: 'hiveId', 
    as: 'hiveTransactions'
  });
  
  Transaction.belongsTo(User, { 
    foreignKey: 'buyerId', 
    as: 'buyer'
  });
  
  Transaction.belongsTo(User, { 
    foreignKey: 'sellerId', 
    as: 'seller',
    constraints: false
  });
  
  Transaction.belongsTo(Hive, { 
    foreignKey: 'hiveId',
    as: 'transactionHive'
  });

  User.hasMany(Conversation, { 
    foreignKey: 'participantOneId', 
    as: 'conversationsAsParticipantOne' 
  });
  
  User.hasMany(Conversation, { 
    foreignKey: 'participantTwoId', 
    as: 'conversationsAsParticipantTwo' 
  });
  
  Conversation.belongsTo(User, { 
    foreignKey: 'participantOneId', 
    as: 'participantOneUser'
  });
  
  Conversation.belongsTo(User, { 
    foreignKey: 'participantTwoId', 
    as: 'participantTwoUser'
  });

  Conversation.hasMany(Message, { 
    foreignKey: 'conversationId', 
    as: 'conversationMessages'
  });
  
  Message.belongsTo(Conversation, { 
    foreignKey: 'conversationId'
  });
  
  User.hasMany(Message, { 
    foreignKey: 'senderId', 
    as: 'sentMessages' 
  });
  
  Message.belongsTo(User, { 
    foreignKey: 'senderId', 
    as: 'messageAuthor'
  });

  Conversation.belongsTo(Message, { 
    foreignKey: 'lastMessageId', 
    as: 'conversationLastMessage',
    constraints: false
  });
};

export {
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
  PasswordReset,
  Transaction,
  Conversation,
  Message
};

export default setupAssociations;
