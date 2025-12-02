import * as cryptoModule from 'crypto';

// expõe o crypto como global para TypeORM (necessário no ESM)
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
(global as any).crypto = cryptoModule;
