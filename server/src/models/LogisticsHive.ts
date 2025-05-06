import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hive } from './Hive';

@Table({
  tableName: 'logistics_hives',
  timestamps: true
})
export class LogisticsHive extends Model {
  @ForeignKey(() => Hive)
  @Column({
    type: DataType.UUID,
    primaryKey: true
  })
  hiveId!: string;

  @BelongsTo(() => Hive)
  hive!: Hive;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  pickupLocation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  dropoffLocation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  itemSizeWeight!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isUrgent!: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  specialInstructions!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isRecurring!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  recurringFrequency!: string; // 'daily', 'weekly', 'monthly', etc.
}
