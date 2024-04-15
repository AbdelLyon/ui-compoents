import { useInfiniteQuery as useInfiniteReactQuery } from "@tanstack/react-query";
import { Query } from "./types";

const useInfiniteQuery = <Data, Request>({
  queryKey,
  request,
  search = {},
  enabled = true,
}: Query<Data, Request>) => {
  const {
    fetchNextPage,
    hasNextPage,
    data,
    isLoading,
    isFetching,
    isSuccess,
    isFetchingNextPage,
    refetch,
  } = useInfiniteReactQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      request({ search: { ...search, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, limit = 10) => {
      const nextPage = pages.length * limit + 1;

      if (lastPage.length < limit) return undefined;

      return nextPage;
    },
    enabled,
  });

  const flattenedData = data?.pages.flatMap((page) =>
    page.map((item: Data) => item)
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

export default useInfiniteQuery;
