import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hive } from './Hive';

@Table({
  tableName: 'side_hustle_hives',
  timestamps: true
})
export class SideHustleHive extends Model {
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
  skillCategory!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  estimatedHours!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  workLocation!: string; // 'remote', 'on-site', 'hybrid'

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  compensationType!: string; // 'fixed', 'hourly', 'negotiable'

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  applicationDeadline!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  experienceLevel!: string; // 'beginner', 'intermediate', 'advanced'

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1
  })
  openPositions!: number;
}
