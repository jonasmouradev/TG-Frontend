import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Adiciona os matchers customizados do jest-dom ao Vitest
expect.extend(matchers);

// Limpa após cada teste
afterEach(() => {
  cleanup();
});
