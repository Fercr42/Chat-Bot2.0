import { render, screen, fireEvent } from "@testing-library/react";
import { MenuComponent } from "../components/menu-component";

// Mock de framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe("MenuComponent", () => {
  const defaultProps = {
    currentView: "menu",
    theme: "Dark",
    toggleTheme: jest.fn(),
    createNewChat: jest.fn(),
    setCurrentView: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render menu title", () => {
    render(<MenuComponent {...defaultProps} />);

    expect(screen.getByText("Hi there 👋")).toBeInTheDocument();
    expect(screen.getByText("How can we help?")).toBeInTheDocument();
  });

  it("should render create new chat button", () => {
    render(<MenuComponent {...defaultProps} />);

    const createButton = screen.getByText("create new chat");
    expect(createButton).toBeInTheDocument();
  });

  it("should call createNewChat when button is clicked", () => {
    const createNewChat = jest.fn();
    render(<MenuComponent {...defaultProps} createNewChat={createNewChat} />);

    const createButton = screen.getByText("create new chat");
    fireEvent.click(createButton);

    expect(createNewChat).toHaveBeenCalled();
  });

  it("should call toggleTheme when theme button is clicked", () => {
    const toggleTheme = jest.fn();
    render(<MenuComponent {...defaultProps} toggleTheme={toggleTheme} />);

    const themeButton = screen.getByRole("button");
    fireEvent.click(themeButton);

    expect(toggleTheme).toHaveBeenCalled();
  });

  it("should render navigation items", () => {
    render(<MenuComponent {...defaultProps} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
  });

  it("should call setCurrentView when navigation items are clicked", () => {
    const setCurrentView = jest.fn();
    render(<MenuComponent {...defaultProps} setCurrentView={setCurrentView} />);

    const homeButton = screen.getByText("Home");
    fireEvent.click(homeButton);

    expect(setCurrentView).toHaveBeenCalledWith("menu");
  });

  it("should apply light theme styles", () => {
    render(<MenuComponent {...defaultProps} theme="Light" />);

    const container = screen.getByRole("generic");
    expect(container).toHaveClass("bg-white");
  });

  it("should apply dark theme styles", () => {
    render(<MenuComponent {...defaultProps} theme="Dark" />);

    const container = screen.getByRole("generic");
    expect(container).toHaveClass("bg-gray-900");
  });

  it("should show active state for current view", () => {
    render(<MenuComponent {...defaultProps} currentView="menu" />);

    const homeButton = screen.getByText("Home");
    expect(homeButton).toHaveClass("bg-blue-600");
  });

  it("should show active state for history view", () => {
    render(<MenuComponent {...defaultProps} currentView="history" />);

    const messagesButton = screen.getByText("Messages");
    expect(messagesButton).toHaveClass("bg-blue-600");
  });
});
