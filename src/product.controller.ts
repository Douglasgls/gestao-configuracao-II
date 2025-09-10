import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

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
}
