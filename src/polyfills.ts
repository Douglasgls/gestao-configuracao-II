import * as cryptoModule from 'crypto';

// expõe o crypto como global para TypeORM (necessário no ESM)
(global as any).crypto = cryptoModule;