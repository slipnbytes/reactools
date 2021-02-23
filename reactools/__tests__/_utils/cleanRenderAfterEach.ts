import { cleanup } from '@testing-library/react';

export function cleanRenderAfterEach(): void {
  afterEach(() => {
    cleanup();
  });
}
