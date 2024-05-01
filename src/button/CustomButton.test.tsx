import { fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CustomButton from "@/button/CustomButton";
import { defaultButtonVariants, defaultButtonSizes } from "../shared/ui/button";
import { ButtonSize, ButtonVariant } from "../button/types";

describe("CustomButton", () => {
  Object.entries({ ...defaultButtonVariants, ...defaultButtonSizes }).forEach(
    ([key, expectedClass]) => {
      it(`should render correctly with "${key}"`, () => {
        const isVariant = defaultButtonVariants.hasOwnProperty(key);
        const { getByRole } = render(
          <CustomButton
            variant={isVariant ? (key as ButtonVariant) : undefined}
            size={!isVariant ? (key as ButtonSize) : undefined}
          >
            {key}
          </CustomButton>
        );
        const button = getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(key);
        expect(button).toHaveClass(expectedClass);
      });
    }
  );

  it("should call onClick callback when clicked", () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <CustomButton onClick={onClickMock}>Click me</CustomButton>
    );

    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("should disable button when disabled", () => {
    const { getByRole } = render(
      <CustomButton disabled>Disabled Button</CustomButton>
    );
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should render child text correctly", () => {
    const buttonText = "Custom Text";
    const { getByRole } = render(<CustomButton>{buttonText}</CustomButton>);
    const button = getByRole("button");
    expect(button).toHaveTextContent(buttonText);
  });

  it("should render custom attributes correctly", () => {
    const dataTestId = "custom-button";
    const { getByTestId } = render(
      <CustomButton data-testid={dataTestId}>Custom Button</CustomButton>
    );
    const button = getByTestId(dataTestId);
    expect(button).toBeInTheDocument();
  });

  it("should display the button with an icon on the left", () => {
    const { getByText, getByTestId } = render(
      <CustomButton
        icon={<span data-testid="test-icon">Icon</span>}
        iconPosition="left"
      >
        My button
      </CustomButton>
    );

    const button = getByText("My button");
    const icon = getByTestId("test-icon");
    const buttonParent = button.parentElement;

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(buttonParent).toContainElement(icon);
  });

  it("should display the button without an icon", () => {
    const { getByText, queryByTestId } = render(
      <CustomButton>My button</CustomButton>
    );

    const button = getByText("My button");
    const icon = queryByTestId("test-icon");
    expect(button).toBeInTheDocument();
    expect(icon).toBeNull();
  });
});
