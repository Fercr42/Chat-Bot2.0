import { render, screen, fireEvent } from "@testing-library/react";
import { InputComponent } from "../shared/input.component";

describe("InputComponent", () => {
  it("should render the input with the correct value", () => {
    render(<InputComponent value="Test value" />);
    expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
  });

  it("should call the onChange function when the input value changes", () => {
    const onChange = jest.fn();
    render(<InputComponent value="" onChange={onChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New value" } });

    expect(onChange).toHaveBeenCalled();
  });

  it("should render the input with the correct class name", () => {
    render(<InputComponent value="Test" className="test-class" />);
    expect(screen.getByDisplayValue("Test")).toHaveClass("test-class");
  });

  it("should render as a textarea element", () => {
    render(<InputComponent value="Test" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("should have the correct number of rows", () => {
    render(<InputComponent value="Test" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "4");
  });
});
