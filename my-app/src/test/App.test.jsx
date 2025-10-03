import { render, screen } from "@testing-library/react";
import App from "../App";

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

describe("App", () => {
  it("should render the app", () => {
    render(<App />);

    // Verificar que el componente principal se renderiza
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render ChatComponent", () => {
    render(<App />);

    // Verificar que se muestra el botón de toggle
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
  });

  it("should have proper CSS classes", () => {
    render(<App />);

    const container = screen.getByRole("generic");
    expect(container).toHaveClass("App");
  });
});
