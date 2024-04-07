import { renderHook, act } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryKey } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useCustomQuery from "../query/useQuery"; // Import du hook à tester
import { waitFor } from "@testing-library/react";

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

  // Fonction de requête fictive pour simuler une requête asynchrone
  const mockRequest = vi.fn(async () => {
    return await [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
      { id: 3, title: "Post 3" },
      { id: 4, title: "Post 4" },
    ];
  });

  // Fonction pour rendre le hook personnalisé avec des options spécifiques
  const renderCustomQueryHook = (options: any) => {
    const { result, waitFor } = renderHook(() => useCustomQuery(options), {
      wrapper,
    });
    return { result, waitFor };
  };

  // Test pour vérifier le comportement lorsque aucun paramètre de recherche n'est passé
  it("should call useQuery with expected params when no search params passed", async () => {
    const { result, waitFor } = renderCustomQueryHook({
      queryKey,
      request: mockRequest,
      search: {},
    });

    // Attente que le chargement soit en cours
    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    // Vérification des données
    expect(result.current.data).toBeUndefined();

    await waitFor(() => result.current.isLoading === false);
    await waitFor(() => expect(result.current.isFetching).toBe(false));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockRequest).toHaveBeenCalledWith({ search: {} });

    expect(result.current.data).toEqual([
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
      { id: 3, title: "Post 3" },
      { id: 4, title: "Post 4" },
    ]);
  });

  // Fonction pour tester un paramètre de recherche spécifique
  const testSearchParam = (paramName: string, paramValue: any) => {
    it(`should call useQuery with ${paramName} if passed`, async () => {
      const searchParams = { [paramName]: paramValue };
      const { result, waitFor } = renderCustomQueryHook({
        queryKey,
        request: mockRequest,
        search: searchParams,
      });

      await waitFor(() => result.current.isLoading === false);

      expect(mockRequest).toHaveBeenCalledWith({ search: searchParams });
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

  // Test pour vérifier que le hook fonctionne correctement lorsque enabled est false
  it("should enable query based on enabled param", async () => {
    const { result } = renderCustomQueryHook({
      queryKey,
      request: mockRequest,
      search: {},
      enabled: false,
    });

    // Vérification que le chargement est toujours en cours et aucune donnée n'est retournée
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();

    // Forcer le rechargement
    act(() => {
      result.current.refetch();
    });

    // Attente que le chargement soit terminé
    await waitFor(() => result.current.isLoading === false);

    // Vérification que les données sont retournées correctement
    expect(result.current.data).toEqual([
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
      { id: 3, title: "Post 3" },
      { id: 4, title: "Post 4" },
    ]);
  });
});
