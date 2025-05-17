import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
import { Conversation } from './Conversation';

@Table({
  tableName: 'messages',
  timestamps: true
})
export class Message extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @ForeignKey(() => Conversation)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  conversationId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  senderId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isRead!: boolean;
}
