import { Product } from './Products.model';

export class OrderProduct {
  id: number;
  product: Product;
  prix_ht: number;
  totalHT: number;
  totalTTC: number;
  quantity: number;
  tva: number;
}
