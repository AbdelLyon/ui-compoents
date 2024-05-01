import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CustomCard, { CardImage } from "../card/CustomCard";
import { CardContent, CardFooter, CardTitle } from "../card";

describe("CustomCard", () => {
  it("does not render footer when footer prop is not provided", () => {
    render(<CustomCard></CustomCard>);
    const footer = screen.queryByRole("contentinfo");
    expect(footer).not.toBeInTheDocument();
  });

  it("renders card with provided children and footer", () => {
    render(
      <CustomCard>
        <CardImage>
          <img src="https://via.placeholder.com/150" alt="test-img" />
        </CardImage>
        <CardTitle>
          <h2>Custom Title</h2>
        </CardTitle>
        <CardContent>
          <p>Custom Description</p>
        </CardContent>
        <CardFooter>
          <p>Custom Footer</p>
        </CardFooter>
      </CustomCard>
    );

    expect(screen.queryByText("Default Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Default Description")).not.toBeInTheDocument();
    expect(screen.queryByText("Card children")).not.toBeInTheDocument();
    expect(screen.queryByText("Footer")).not.toBeInTheDocument();

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Custom Footer")).toBeInTheDocument();
  });
});
