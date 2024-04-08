import { renderHook, act } from "@testing-library/react-hooks";
import {
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from "@tanstack/react-query";
import { beforeEach, describe, expect, it } from "vitest";
import useCustomQuery from "../../query/useCustomQuery";
import { waitFor } from "@testing-library/react";
import { mockPosts, posts } from "./mocks";

describe("useCustomQuery", () => {
  const queryKey: QueryKey = ["posts"];
  let queryClient: QueryClient;
  let wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;

  // Initialisation des variables avant chaque test
  beforeEach(() => {
    queryClient = new QueryClient();
    // Enveloppe pour fournir le contexte de requête
    wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  const renderCustomQueryHook = (options: any) => {
    const { result, waitFor } = renderHook(() => useCustomQuery(options), {
      wrapper,
    });
    return { result, waitFor };
  };

  it("should call useQuery with expected params when no search params passed", async () => {
    const { result, waitFor } = renderCustomQueryHook({
      queryKey,
      request: mockPosts,
      search: {},
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(result.current.data).toBeUndefined();

    await waitFor(() => result.current.isLoading === false);
    await waitFor(() => expect(result.current.isFetching).toBe(false));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockPosts).toHaveBeenCalledWith({ search: {} });

    expect(result.current.data).toEqual(posts);
  });

  it("should enable query based on enabled param", async () => {
    const { result } = renderCustomQueryHook({
      queryKey,
      request: mockPosts,
      search: {},
      enabled: false,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => result.current.isLoading === false);
    expect(result.current.data).toEqual(posts);
  });

  const testSearchParam = (paramName: string, paramValue: any) => {
    it(`should call useQuery with ${paramName} if passed`, async () => {
      const searchParams = { [paramName]: paramValue };
      const { result, waitFor } = renderCustomQueryHook({
        queryKey,
        request: mockPosts,
        search: searchParams,
      });

      await waitFor(() => result.current.isLoading === false);
      expect(mockPosts).toHaveBeenCalledWith({ search: searchParams });
    });
  };

  // Tests pour différents paramètres de recherche possibles
  testSearchParam("filters", [
    { field: "title", operator: "eq", value: "post 1" },
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
  // Aggregates
  testSearchParam("aggregates", [
    {
      relation: "someRelation",
      type: "someType",
      field: "someField",
      filters: [{ field: "field1", value: "value1" }],
    },
  ]);

  // Gates
  testSearchParam("gates", ["create", "view"]);
});
