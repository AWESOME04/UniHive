import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
import { Message } from './Message';

@Table({
  tableName: 'conversations',
  timestamps: true
})
export class Conversation extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  participantOneId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  participantTwoId!: string;

  @ForeignKey(() => Message)
  @Column({
    type: DataType.UUID,
    allowNull: true
  })
  lastMessageId!: string;
}
