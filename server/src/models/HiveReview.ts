import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Hive } from './Hive';
import { User } from './User';

@Table({
  tableName: 'hive_reviews',
  timestamps: true
})
export class HiveReview extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @ForeignKey(() => Hive)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  hiveId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  reviewerId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  reviewedId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  rating!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  comment!: string;
}
