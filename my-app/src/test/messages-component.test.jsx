import { render, screen, fireEvent } from "@testing-library/react";
import { MessagesComponent } from "../components/messages-component";

// Mock de framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe("MessagesComponent", () => {
  const defaultProps = {
    theme: "Dark",
    chatMessages: [],
    handleCopyToClipboard: jest.fn(),
    copiedMessageId: null,
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render messages correctly", () => {
    const messages = [
      { id: 1, text: "Hello", sender: "user" },
      { id: 2, text: "Hi there", sender: "bot" },
    ];

    render(<MessagesComponent {...defaultProps} chatMessages={messages} />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("should render loading state", () => {
    render(<MessagesComponent {...defaultProps} isLoading={true} />);

    // Verificar que se renderiza el estado de loading
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    const error = { message: "Test error" };
    render(<MessagesComponent {...defaultProps} error={error} />);

    expect(screen.getByText("Error: Test error")).toBeInTheDocument();
  });

  it("should handle copy to clipboard", () => {
    const handleCopyToClipboard = jest.fn();
    const messages = [{ id: 1, text: "Hello", sender: "user" }];

    render(
      <MessagesComponent
        {...defaultProps}
        chatMessages={messages}
        handleCopyToClipboard={handleCopyToClipboard}
      />
    );

    const copyButton = screen.getByRole("button");
    fireEvent.click(copyButton);

    expect(handleCopyToClipboard).toHaveBeenCalledWith("Hello", 1);
  });

  it("should show copied state", () => {
    const messages = [{ id: 1, text: "Hello", sender: "user" }];

    render(
      <MessagesComponent
        {...defaultProps}
        chatMessages={messages}
        copiedMessageId={1}
      />
    );

    // Verificar que se muestra el ícono de check
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should apply light theme styles", () => {
    render(<MessagesComponent {...defaultProps} theme="Light" />);

    const container = screen.getAllByRole("generic")[0];
    expect(container).toHaveClass("bg-[#f5f5f5]");
  });

  it("should apply dark theme styles", () => {
    render(<MessagesComponent {...defaultProps} theme="Dark" />);

    const container = screen.getAllByRole("generic")[0];
    expect(container).toHaveClass("bg-gray-900");
  });
});
