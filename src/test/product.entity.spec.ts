import { Product } from '../product.entity';

describe('Product Entity', () => {
  it('should create a new instance of Product and assign properties', () => {
    const product = new Product();

    product.id = 1;
    product.name = 'Test Product';
    product.price = 99.99;

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(1);
    expect(product.name).toEqual('Test Product');
    expect(product.price).toBe(99.99);

    // expect(product.created_at).toBeDefined();
    // expect(product.updated_at).toBeDefined();
  });
});
