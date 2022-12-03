import { OrderProduct } from './OrderProduct';
import { Customer } from './Customer.model';
export class Order {
  id?: number;
  customer: Customer;
  orderProducts: OrderProduct[];
  orderDate?: Date;
  totalht: number;
  total: number;
}
