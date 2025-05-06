import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hive } from './Hive';

@Table({
  tableName: 'essentials_hives',
  timestamps: true
})
export class EssentialsHive extends Model {
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
  condition!: string; // 'new', 'like-new', 'good', 'fair', 'poor'

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  brand!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  purchaseDate!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  itemCategory!: string; // 'electronics', 'books', 'furniture', etc.

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true
  })
  photos!: string[];

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  pickupLocation!: string;
}
