import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getProducts(): Object {
    return [
      { id: 1, name: 'Produto A', price: 100 },
      { id: 2, name: 'Produto B', price: 150 },
      { id: 3, name: 'Produto C', price: 200 },
    ]
  }
}
