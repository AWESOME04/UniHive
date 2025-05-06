import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'otps',
  timestamps: true
})
export class OTP extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  userId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  otp!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  expiresAt!: Date;
}
