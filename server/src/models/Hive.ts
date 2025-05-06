import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { HiveType } from './HiveType';

@Table({
  tableName: 'hives',
  timestamps: true
})
export class Hive extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @ForeignKey(() => HiveType)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  hiveTypeId!: string;

  @BelongsTo(() => HiveType)
  hiveType!: HiveType;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'open'
  })
  status!: string; // 'open', 'assigned', 'completed', 'cancelled'

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  postedById!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true
  })
  assignedToId!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  deadline!: Date;
}
