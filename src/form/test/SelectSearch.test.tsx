import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SelectSearch } from "../../form";
describe("SelectSearch", () => {
  it("should render without crashing", () => {
    render(
      <SelectSearch options={[]} onSelectChange={vi.fn()} selectionKeys={[]} />
    );
  });

  it("should render the select input with placeholder", () => {
    render(
      <SelectSearch
        options={[]}
        onSelectChange={() => {}}
        selectionKeys={[]}
        placeholder="Placeholder"
        value=""
      />
    );
    const select = screen.getByTestId("select-element");
    expect(select).toBeInTheDocument();
  });

  it("should render the select input with correct attributes", () => {
    render(
      <SelectSearch
        options={[]}
        onSelectChange={() => {}}
        selectionKeys={[]}
        placeholder="Placeholder"
        value=""
      />
    );

    const select = screen.getByTestId("select-element");
    expect(select.firstChild).toHaveAttribute("aria-controls", "radix-:r2:");
    expect(select.firstChild).toHaveAttribute("aria-expanded", "false");
    expect(select.firstChild).toHaveAttribute("aria-haspopup", "dialog");
    expect(select.firstChild).toHaveStyle("width: 100%;");
    expect(select.firstChild).toHaveClass(
      "w-[400px] flex justify-between items-center px-3 h-11 border border-foreground bg-transparent rounded-md cursor-pointer"
    );
    expect(select.firstChild).toContainHTML(
      '<p class="truncate text-[13px] text-muted-foreground opacity-50">Placeholder</p>'
    );
  });
});
