import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hive } from './Hive';

@Table({
  tableName: 'buzz_hives',
  timestamps: true
})
export class BuzzHive extends Model {
  @ForeignKey(() => Hive)
  @Column({
    type: DataType.UUID,
    primaryKey: true
  })
  hiveId!: string;

  @BelongsTo(() => Hive)
  hive!: Hive;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  eventDate!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  location!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  organizer!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  eventType!: string; // 'party', 'workshop', 'meeting', etc.

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  admission!: string; // 'free', 'ticketed', 'members-only'

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  capacity!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  registrationLink!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  promotionalImage!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  isItem13!: boolean;  // Indicates if food is available at the event (Ghana's "Item 13")
}
