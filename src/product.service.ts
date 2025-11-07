import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<number> {
    const result: DeleteResult = await this.productRepository.delete(id);

    return result.affected || 0;
  }
}
