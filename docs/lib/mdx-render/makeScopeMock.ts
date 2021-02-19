import type { ScopeMock } from './types';

export function makeScopeMock(imports: string[]): ScopeMock {
  return imports.reduce(
    (currentScope, currentImport) =>
      Object.assign(currentScope, {
        [currentImport]: () => '',
      }),
    {},
  );
}
