import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductController (Basic Check)', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const mockProductService = {
      getHello: () => 'Hello World',
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return "Hello World"', () => {
      expect(productController.getHello()).toBe('Hello World');
    });
  });
});

describe('ProductController (Remove Method)', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('deve remover um produto existente e retornar 204', async () => {
    (service.deleteProduct as jest.Mock).mockResolvedValue(true);

    await expect(controller.deleteProduct(1)).resolves.toBeUndefined();
    expect(service.deleteProduct).toHaveBeenCalledWith(1);
  });

  it('deve retornar 404 se o produto não existir', async () => {
    (service.deleteProduct as jest.Mock).mockResolvedValue(false);

    await expect(controller.deleteProduct(999)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.deleteProduct).toHaveBeenCalledWith(999);
  });
});
