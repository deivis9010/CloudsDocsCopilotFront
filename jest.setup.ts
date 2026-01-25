import '@testing-library/jest-dom';

// Mock de import.meta para Jest
globalThis.import = {
// Mock simple de import.meta para evitar errores de TS
// Usamos (globalThis as any) para evitar errores de tipado estricto
(globalThis as any).import = {
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111
  meta: {
    env: {
      VITE_API_BASE_URL: 'http://localhost:3000/api',
    },
  },
} as any;
};
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111
} as any;
