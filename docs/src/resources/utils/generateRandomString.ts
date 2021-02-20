import { randomBytes } from 'crypto';

export function generateRandomString(size = 10): string {
  return randomBytes(size).toString('hex');
}
