import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CustomCard from "../card/CustomCard";

describe("CustomCard", () => {
  it("does not render footer when footer prop is not provided", () => {
    render(<CustomCard title="Default Title" />);
    const footer = screen.queryByRole("contentinfo");
    expect(footer).not.toBeInTheDocument();
  });

  it("test", () => {
    render(
      <CustomCard
        title="Default Title"
        description="Default Description"
        footer={<p>Footer</p>}
      >
        <p>Card children</p>
      </CustomCard>
    );

    expect(screen.getByText("Default Title")).toBeInTheDocument();
    expect(screen.getByText("Default Description")).toBeInTheDocument();
    expect(screen.getByText("Card children")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
