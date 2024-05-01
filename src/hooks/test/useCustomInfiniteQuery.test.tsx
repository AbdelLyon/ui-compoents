import { renderHook, act } from "@testing-library/react-hooks";
import {
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from "@tanstack/react-query";
import { beforeEach, describe, expect, it } from "vitest";
import { mockPostsPaginate, posts } from "./mocks";
import { useInfiniteQuery } from "../../hooks";

describe("useCustomInfiniteQuery", () => {
  const queryKey: QueryKey = ["posts"];
  let queryClient: QueryClient;
  let wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;

  beforeEach(() => {
    queryClient = new QueryClient();
    wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  const renderCustomQueryHook = (options: any) => {
    const { result, waitFor } = renderHook(() => useInfiniteQuery(options), {
      wrapper,
    });
    return { result, waitFor };
  };

  it("should call useCustomInfiniteQuery with expected params when no search params passed", async () => {
    const { result, waitFor } = renderCustomQueryHook({
      queryKey,
      request: () => mockPostsPaginate({ search: { page: 1 } }),
      search: { limit: 10 },
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(result.current.data).toHaveLength(0);

    await waitFor(() => result.current.isLoading === false);
    await waitFor(() => expect(result.current.isFetching).toBe(false));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockPostsPaginate).toHaveBeenCalledWith({ search: { page: 1 } });

    expect(result.current.data).toEqual(posts.slice(0, 10));
  });

  it("should call useCustomInfiniteQuery with expected params for page 2", async () => {
    const { result, waitFor } = renderCustomQueryHook({
      queryKey,
      request: () => mockPostsPaginate({ search: { page: 2 } }),
      search: { limit: 10 },
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(result.current.data).toHaveLength(0);

    await waitFor(() => result.current.isLoading === false);
    await waitFor(() => expect(result.current.isFetching).toBe(false));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    act(() => {
      result.current.fetchNextPage();
    });

    expect(mockPostsPaginate).toHaveBeenCalledWith({ search: { page: 2 } });

    expect(result.current.data).toEqual(posts.slice(10, posts.length));
  });

  const testSearchParam = (paramName: string, paramValue: any) => {
    it(`should call useQuery with ${paramName} if passed`, async () => {
      const searchParams = { [paramName]: paramValue };
      const { result, waitFor } = renderCustomQueryHook({
        queryKey,
        request: () =>
          mockPostsPaginate({
            search: { ...searchParams, page: 1 },
          }),
        search: { ...searchParams },
      });

      await waitFor(() => result.current.isLoading === false);

      expect(mockPostsPaginate).toHaveBeenCalledWith({
        search: { ...searchParams, page: 1 },
      });
    });
  };

  // Tests params
  testSearchParam("filters", [
    { field: "title", operator: "=", value: "post 1" },
  ]);
  testSearchParam("includes", [
    { relation: "author", filters: [], limit: 5 },
    { relation: "comments", filters: [], limit: 10 },
  ]);
  testSearchParam("instructions", [
    { name: "instruction1", fields: [{ name: "field1", value: "value1" }] },
    { name: "instruction2", fields: [{ name: "field2", value: "value2" }] },
  ]);
  testSearchParam("scopes", [{ name: "scope1", parameters: ["param1"] }]);
  testSearchParam("sorts", [{ field: "title", direction: "asc" }]);

  testSearchParam("aggregates", [
    {
      relation: "stars",
      type: "max",
      field: "rate",
      filters: [{ field: "approved", value: true }],
    },
  ]);

  testSearchParam("gates", ["create", "view"]);
});
