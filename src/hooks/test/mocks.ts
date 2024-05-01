import { vi } from "vitest";

export const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
  { id: 4, title: "Post 4" },
  { id: 5, title: "Post 5" },
  { id: 6, title: "Post 6" },
  { id: 7, title: "Post 7" },
  { id: 8, title: "Post 8" },
  { id: 9, title: "Post 9" },
  { id: 10, title: "Post 10" },
  { id: 11, title: "Post 11" },
  { id: 12, title: "Post 12" },
  { id: 13, title: "Post 13" },
];

export const mockPostsPaginate = vi.fn(
  async ({ search }: { search: { page: number } }) => {
    const paginatedResult = posts.slice(
      (search.page ? search.page - 1 : 0) * 10,
      (search.page ? search.page : 1) * 10
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    return paginatedResult;
  }
);

export const mockPosts = vi.fn(async () => posts);
