import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cart } from '../carts/carts.model';
import { Order } from '../orders/orders.model';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Cart)
  cart: Cart[];

  @HasMany(() => Order)
  orders: Order[];
}
