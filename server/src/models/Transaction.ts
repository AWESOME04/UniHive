import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Hive } from './Hive';

@Table({
  tableName: 'transactions',
  timestamps: true
})
export class Transaction extends Model {
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
  buyerId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true
  })
  sellerId!: string | null;

  @ForeignKey(() => Hive)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  hiveId!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  amount!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  })
  platformFee!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  paystackReference!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'pending'
  })
  status!: string; // pending, successful, failed

  @Column({
    type: DataType.JSONB,
    allowNull: true
  })
  metadata!: object;
}
