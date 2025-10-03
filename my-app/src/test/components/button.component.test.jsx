import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonComponent } from "../../shared/button.component";

describe("ButtonComponent", () => {
  it("should render the button with the correct name", () => {
    render(<ButtonComponent name="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should call the onClick function when the button is clicked", () => {
    const onClick = jest.fn();
    render(<ButtonComponent name="Test" onClick={onClick} />);
    fireEvent.click(screen.getByText("Test"));
    expect(onClick).toHaveBeenCalled();
  });

  it("should render the button with the correct class name", () => {
    render(<ButtonComponent name="Test" className="test-class" />);
    expect(screen.getByText("Test")).toHaveClass("test-class");
  });
});
