import { webcrypto } from 'crypto';

// Só define crypto no global se ainda não existir
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
if (!(global as any).crypto) {
  (global as any).crypto = webcrypto;
}