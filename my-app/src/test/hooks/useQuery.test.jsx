import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQueryChat } from "../../hooks/use-query-chat.hook";

// Mock del servicio de entorno
jest.mock("../services/env-services", () => ({
  ChatApiConfig: {
    url: "https://api.openai.com/v1/chat/completions",
    key: "test-api-key",
  },
}));

// Mock de fetch global
global.fetch = jest.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useQueryChat", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should not execute query when enabled is false", () => {
    const { result } = renderHook(
      () => useQueryChat("Test message", [], false),
      { wrapper: createWrapper() }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should not execute query when message is empty", () => {
    const { result } = renderHook(() => useQueryChat("", [], true), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should execute query when enabled is true and message is provided", async () => {
    const mockResponse = {
      choices: [{ message: { content: "Test response" } }],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(
      () => useQueryChat("Test message", [], true),
      { wrapper: createWrapper() }
    );

    // Esperar a que la query se ejecute
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer test-api-key",
        }),
        body: expect.stringContaining("Test message"),
      })
    );
  });

  it("should handle API errors", async () => {
    fetch.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(
      () => useQueryChat("Test message", [], true),
      { wrapper: createWrapper() }
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current.error).toBeTruthy();
  });
});
