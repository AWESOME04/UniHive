import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { Hive } from './Hive';

@Table({
  tableName: 'hive_types',
  timestamps: true
})
export class HiveType extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  icon!: string;

  @HasMany(() => Hive)
  hives!: Hive[];
}
