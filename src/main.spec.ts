import { Test } from '@nestjs/testing';
import { ProductModule } from './product.module';

describe('Main bootstrap', () => {
  it('deve inicializar o aplicativo sem erros', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    expect(app).toBeDefined();
    await app.close();
  });
});
