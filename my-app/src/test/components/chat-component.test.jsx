import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChatComponent } from "../../components/chat-component";

// Mock de framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <div>{children}</div>,
}));

// Mock de los hooks
jest.mock("../hooks/use-query-chat.hook", () => ({
  useQueryChat: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
}));

jest.mock("../hooks/use-localStorage-chat.hook", () => ({
  useLocalStorageChat: () => ({
    saveChat: jest.fn(),
    clearChat: jest.fn(),
    loadChat: jest.fn(),
    chats: [],
  }),
}));

describe("ChatComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render toggle button", () => {
    render(<ChatComponent />);

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
  });

  it("should toggle interface when button is clicked", () => {
    render(<ChatComponent />);

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    // Verificar que se muestra el menú
    expect(screen.getByText("Hi there 👋")).toBeInTheDocument();
  });

  it("should show menu when currentView is menu", () => {
    render(<ChatComponent />);

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Hi there 👋")).toBeInTheDocument();
    expect(screen.getByText("How can we help?")).toBeInTheDocument();
  });

  it("should show create new chat button", () => {
    render(<ChatComponent />);

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(screen.getByText("create new chat")).toBeInTheDocument();
  });

  it("should handle input changes", () => {
    render(<ChatComponent />);

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    const createButton = screen.getByText("create new chat");
    fireEvent.click(createButton);

    // Verificar que se muestra el área de chat
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  it("should handle send message", () => {
    render(<ChatComponent />);

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    const createButton = screen.getByText("create new chat");
    fireEvent.click(createButton);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test message" } });

    const sendButton = screen.getAllByRole("button")[1];
    fireEvent.click(sendButton);

    expect(textarea).toHaveValue("");
  });

  it("should apply dark theme styles", () => {
    render(<ChatComponent />);

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    const createButton = screen.getByText("create new chat");
    fireEvent.click(createButton);

    const container = screen.getByRole("generic");
    expect(container).toHaveClass("bg-gray-900");
  });

  it("should handle search functionality", () => {
    render(<ChatComponent />);

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    const createButton = screen.getByText("create new chat");
    fireEvent.click(createButton);

    // Buscar el input de búsqueda
    const searchInput = screen.getByPlaceholderText("Search messages...");
    expect(searchInput).toBeInTheDocument();
  });
});
