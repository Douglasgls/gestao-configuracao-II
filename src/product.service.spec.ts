import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

const mockProductRepository = {
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Teste para getProducts ---
  describe('getProducts', () => {
    it('deve retornar um array de produtos', async () => {
      const result: Product[] = [
        {
          id: 1,
          name: 'Prod 1',
          price: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      (repository.find as jest.Mock).mockResolvedValue(result);

      expect(await service.getProducts()).toEqual(result);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('createProduct', () => {
    it('deve criar e retornar o produto salvo', async () => {
      const productToCreate: Product = {
        name: 'Novo Prod',
        price: 50,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const createdProduct: Product = { id: 1, ...productToCreate };

      (repository.save as jest.Mock).mockResolvedValue(createdProduct);

      expect(await service.createProduct(productToCreate)).toEqual(
        createdProduct,
      );
      expect(repository.save).toHaveBeenCalledWith(productToCreate);
    });
  });

  // --- Teste para deleteProduct ---
  describe('deleteProduct', () => {
    it('deve retornar o número de linhas afetadas (1) quando a exclusão for bem-sucedida', async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: {} };
      const id = 1;

      (repository.delete as jest.Mock).mockResolvedValue(deleteResult);

      expect(await service.deleteProduct(id)).toBe(1);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('deve retornar 0 quando nenhum produto for encontrado para exclusão', async () => {
      const deleteResult: DeleteResult = { affected: 0, raw: {} };
      const id = 999;

      (repository.delete as jest.Mock).mockResolvedValue(deleteResult);

      expect(await service.deleteProduct(id)).toBe(0);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
