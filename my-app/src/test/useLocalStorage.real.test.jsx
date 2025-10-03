import { renderHook, act } from "@testing-library/react";
import { useLocalStorageChat } from "../hooks/use-localStorage-chat.hook.jsx";

// Mock localStorage con Jest
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useLocalStorageChat (Real Hook)", () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue("[]");
  });

  it("should load initial chats from localStorage on mount", () => {
    const mockChats = [
      { id: "1", title: "Chat 1", messages: [] },
      { id: "2", title: "Chat 2", messages: [] },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockChats));

    const { result } = renderHook(() => useLocalStorageChat());

    expect(result.current.chats).toEqual(mockChats);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("chats");
  });

  it("should handle empty localStorage on mount", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorageChat());

    expect(result.current.chats).toEqual([]);
  });

  it("should handle JSON parse errors gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid json");

    const { result } = renderHook(() => useLocalStorageChat());

    expect(result.current.chats).toEqual([]);
  });

  it("should handle non-array data in localStorage", () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({ not: "an array" })
    );

    const { result } = renderHook(() => useLocalStorageChat());

    expect(result.current.chats).toEqual([]);
  });

  it("should save a new chat and update state", () => {
    const { result } = renderHook(() => useLocalStorageChat());

    const newChat = {
      id: "1",
      title: "New Chat",
      messages: [],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    };

    act(() => {
      result.current.saveChat(newChat);
    });

    expect(result.current.chats).toEqual([newChat]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "chats",
      JSON.stringify([newChat])
    );
  });

  it("should update an existing chat", () => {
    const existingChat = {
      id: "1",
      title: "Original Chat",
      messages: [],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify([existingChat]));

    const { result } = renderHook(() => useLocalStorageChat());

    const updatedChat = {
      ...existingChat,
      title: "Updated Chat",
      messages: [{ id: 1, text: "Hello", sender: "user" }],
    };

    act(() => {
      result.current.saveChat(updatedChat);
    });

    expect(result.current.chats).toEqual([updatedChat]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "chats",
      JSON.stringify([updatedChat])
    );
  });

  it("should clear a chat and update state", () => {
    const chats = [
      { id: "1", title: "Chat 1", messages: [] },
      { id: "2", title: "Chat 2", messages: [] },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(chats));

    const { result } = renderHook(() => useLocalStorageChat());

    act(() => {
      result.current.clearChat("1");
    });

    expect(result.current.chats).toEqual([
      { id: "2", title: "Chat 2", messages: [] },
    ]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "chats",
      JSON.stringify([{ id: "2", title: "Chat 2", messages: [] }])
    );
  });

  it("should load a specific chat messages", () => {
    const chats = [
      {
        id: "1",
        title: "Chat 1",
        messages: [
          { id: 1, text: "Hello", sender: "user" },
          { id: 2, text: "Hi there", sender: "bot" },
        ],
      },
      { id: "2", title: "Chat 2", messages: [] },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(chats));

    const { result } = renderHook(() => useLocalStorageChat());

    const messages = result.current.loadChat("1");

    expect(messages).toEqual([
      { id: 1, text: "Hello", sender: "user" },
      { id: 2, text: "Hi there", sender: "bot" },
    ]);
  });

  it("should return empty array when chat not found", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    const { result } = renderHook(() => useLocalStorageChat());

    const messages = result.current.loadChat("nonexistent");

    expect(messages).toEqual([]);
  });

  it("should handle localStorage errors during saveChat", () => {
    localStorageMock.getItem.mockReturnValue("invalid json");
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error("Storage error");
    });

    const { result } = renderHook(() => useLocalStorageChat());

    const newChat = { id: "1", title: "Test Chat", messages: [] };

    // El hook debería lanzar el error porque no tiene try-catch en setItem
    expect(() => {
      act(() => {
        result.current.saveChat(newChat);
      });
    }).toThrow("Storage error");
  });
});
