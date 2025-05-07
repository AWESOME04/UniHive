import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'password_resets',
  timestamps: true
})
export class PasswordReset extends Model {
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
  userId!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  token!: string;
  
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  expiresAt!: Date;
  
  @BelongsTo(() => User)
  user!: User;
}
