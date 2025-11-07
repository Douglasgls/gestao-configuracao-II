import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

const mockProduct: Product = {
  id: 1,
  name: 'Mock Product 1',
  price: 100,
  created_at: new Date(),
  updated_at: new Date(),
};
const mockProductList: Product[] = [
  mockProduct,
  { ...mockProduct, id: 2, name: 'Mock Product 2' },
];

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

describe('ProductController', () => {
  let controller: ProductController;

  let getHelloMock: jest.Mock;
  let getProductsMock: jest.Mock;
  let createProductMock: jest.Mock;
  let deleteProductMock: jest.Mock;

  beforeEach(async () => {
    getHelloMock = jest.fn().mockReturnValue('Hello World');
    getProductsMock = jest.fn();
    createProductMock = jest.fn();
    deleteProductMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getHello: getHelloMock,
            getProducts: getProductsMock,
            createProduct: createProductMock,
            deleteProduct: deleteProductMock,
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  describe('GET /', () => {
    it('deve retornar a lista de todos os produtos com status 200', async () => {
      getProductsMock.mockResolvedValue(mockProductList);

      const result = await controller.getProducts();

      expect(result).toEqual(mockProductList);
      expect(getProductsMock).toHaveBeenCalled();
    });
  });

  describe('POST /', () => {
    const productDto = { name: 'Novo Prod', price: 150 } as Product;

    it('deve criar um novo produto e retornar o objeto criado com status 201', async () => {
      const createdProduct = { ...mockProduct, ...productDto };
      createProductMock.mockResolvedValue(createdProduct);

      const result = await controller.createProduct(productDto);

      expect(result).toEqual(createdProduct);
      expect(createProductMock).toHaveBeenCalledWith(productDto);
    });
  });

  describe('GET /hello', () => {
    it('deve retornar "Hello World"', () => {
      const result = controller.getHello();

      expect(result).toBe('Hello World');
    });
  });

  describe('DELETE /:id', () => {
    it('deve remover um produto existente e retornar 204 (undefined)', async () => {
      deleteProductMock.mockResolvedValue(true);

      await expect(controller.deleteProduct(1)).resolves.toBeUndefined();
      expect(deleteProductMock).toHaveBeenCalledWith(1);
    });

    it('deve retornar 404 se o produto não existir', async () => {
      deleteProductMock.mockResolvedValue(false);

      await expect(controller.deleteProduct(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(deleteProductMock).toHaveBeenCalledWith(999);
    });
  });
});
