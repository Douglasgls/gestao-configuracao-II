import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getHello(): string {
    return 'Hello World! <br> Acesse /api/products para ver os produtos.';
  }

  @Get('/products')
  getProducts(): Object {
    return this.productService.getProducts();
  }

  @Post('/products')
  createProduct(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }
}
