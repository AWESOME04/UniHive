import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model {
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isVerified!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  university!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  profileImage!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  bio!: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0
  })
  rating!: number;
}
