// Mock de import.meta.env para Jest
const mockImportMeta = {
  env: {
    VITE_OPENAI_API_KEY: "test-api-key",
    VITE_OPENAI_API_URL: "https://api.openai.com/v1/chat/completions",
  },
};

// Asignar mockImportMeta a import.meta
Object.defineProperty(global, "import", {
  value: {
    meta: mockImportMeta,
  },
});

describe("env-services", () => {
  beforeEach(() => {
    // Limpiar el cache del módulo
    jest.resetModules();
  });

  it("should export ChatApiConfig with correct values", () => {
    // Importar después de configurar el mock
    const envServices = require("../services/env-services");

    expect(envServices.ChatApiConfig).toBeDefined();
    expect(envServices.ChatApiConfig.key).toBe("test-api-key");
    expect(envServices.ChatApiConfig.url).toBe(
      "https://api.openai.com/v1/chat/completions"
    );
  });

  it("should handle missing environment variables", () => {
    // Mock con variables faltantes
    const mockImportMetaEmpty = {
      env: {},
    };

    Object.defineProperty(global, "import", {
      value: {
        meta: mockImportMetaEmpty,
      },
    });

    // Limpiar cache y reimportar
    jest.resetModules();
    const envServices = require("../services/env-services");

    expect(envServices.ChatApiConfig).toBeDefined();
    expect(envServices.ChatApiConfig.key).toBeUndefined();
    expect(envServices.ChatApiConfig.url).toBeUndefined();
  });

  it("should have default values when env vars are undefined", () => {
    const mockImportMetaUndefined = {
      env: {
        VITE_OPENAI_API_KEY: undefined,
        VITE_OPENAI_API_URL: undefined,
      },
    };

    Object.defineProperty(global, "import", {
      value: {
        meta: mockImportMetaUndefined,
      },
    });

    jest.resetModules();
    const envServices = require("../services/env-services");

    expect(envServices.ChatApiConfig).toBeDefined();
    expect(envServices.ChatApiConfig.key).toBeUndefined();
    expect(envServices.ChatApiConfig.url).toBeUndefined();
  });
});
