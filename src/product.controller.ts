import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/hello')
  getHello(): string {
    return 'Hello World';
  }

  @Get('/')
  @HttpCode(200)
  async getProducts(): Promise<object> {
    return await this.productService.getProducts();
  }

  // istanbul ignore next
  @Post('/')
  @HttpCode(201)
  createProduct(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: number): Promise<void> {
    const result = await this.productService.deleteProduct(Number(id));

    console.log('Delete result:', result);

    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }
}
