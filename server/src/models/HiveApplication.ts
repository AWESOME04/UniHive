import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hive } from './Hive';
import { User } from './User';

@Table({
  tableName: 'hive_applications',
  timestamps: true
})
export class HiveApplication extends Model {
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

  @BelongsTo(() => Hive)
  hive!: Hive;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  applicantId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  message!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'pending'
  })
  status!: string; // 'pending', 'accepted', 'rejected'
}
