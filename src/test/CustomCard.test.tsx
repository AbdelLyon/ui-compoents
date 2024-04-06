import { render } from "@testing-library/react";
import CustomCard from "@/card/CustomCard";
import { describe, expect, it } from "vitest";

describe("CustomCard", () => {
  it("renders CustomCard component with title and description", () => {
    const title = "test Title";
    const description = "Test Description";
    const { getByText } = render(
      <CustomCard title={title} description={description} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
  });

  it("renders CustomCard component with content and footer", () => {
    const content = "Test Content";
    const footer = <div>Test Footer</div>;
    const image = <img src="test.png" alt="test" />;
    const { getByText } = render(
      <CustomCard
        content={content}
        img={image}
        footer={footer}
        title="Test Title"
      />
    );

    expect(getByText(content)).toBeInTheDocument();
    expect(getByText("Test Footer")).toBeInTheDocument();
  });
});
