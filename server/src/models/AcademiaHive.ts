import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hive } from './Hive';

@Table({
  tableName: 'academia_hives',
  timestamps: true
})
export class AcademiaHive extends Model {
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
  subject!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  courseCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  academicLevel!: string; // 'undergraduate', 'graduate', etc.

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  sessionFormat!: string; // 'one-on-one', 'group'

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  tutorQualifications!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  duration!: number; // in minutes

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  learningGoals!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  location!: string; // 'online', 'library', etc.
}
