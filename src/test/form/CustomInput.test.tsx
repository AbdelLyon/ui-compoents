import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import InputCustom from "../../form/InputCustom";

it("renders input field with placeholder", () => {
  const placeholderText = "Enter text...";
  render(<InputCustom placeholder={placeholderText} />);
  const inputElement = screen.getByPlaceholderText(placeholderText);
  expect(inputElement).toBeInTheDocument();
});
