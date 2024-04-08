import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "./queryTypes";

type UseCustomInfiniteQuery<T> = {
  queryKey: QueryKey;
  request: ({ search }: { search?: Partial<Search> }) => Promise<T[]>;
  search: Partial<Search>;
  enabled?: boolean;
};

const useCustomInfiniteQuery = <T>({
  queryKey,
  request,
  search: {
    includes,
    filters,
    sorts,
    instructions,
    scopes,
    gates,
    aggregates,
    limit = 10,
  },
  enabled = true, // Utilisation de la valeur par défaut pour enabled
}: UseCustomInfiniteQuery<T>) => {
  const {
    fetchNextPage,
    hasNextPage,
    data,
    isLoading,
    isFetching,
    isSuccess,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      request({
        search: {
          page: pageParam,
          limit,
          ...(includes && includes.length > 0 && { includes }),
          ...(filters && filters.length > 0 && { filters }),
          ...(sorts && sorts.length > 0 && { sorts }),
          ...(instructions && instructions.length > 0 && { instructions }),
          ...(scopes && scopes.length > 0 && { scopes }),
          ...(gates && gates.length > 0 && { gates }),
          ...(aggregates && aggregates.length > 0 && { aggregates }),
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => allPages.length + 1,
    enabled,
  });

  const flattenedData = data?.pages.flatMap((page) =>
    page.map((item: T) => item)
  );

  return {
    fetchNextPage,
    hasNextPage,
    data: flattenedData,
    pages: data?.pages,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isSuccess,
    refetch,
  };
};

export default useCustomInfiniteQuery;
