import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hive } from './Hive';

@Table({
  tableName: 'archive_hives',
  timestamps: true
})
export class ArchiveHive extends Model {
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
  courseCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  resourceType!: string; // 'notes', 'past-exam', 'solution', 'template'

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  professor!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  semester!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  year!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  fileFormat!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  fileUrl!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  downloadCount!: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0
  })
  rating!: number;
}
