import { useQuery as useReactQuery } from "@tanstack/react-query";
import { Query } from "./types";

const useQuery = <Data, Request>({
  queryKey,
  request,
  search,
  enabled,
}: Query<Data, Request>) => {
  const { data, isLoading, isFetching, isSuccess, refetch } = useReactQuery({
    queryKey,
    queryFn: () =>
      request({
        search,
      }),
    enabled,
  });

  return {
    data: data,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  };
};

export default useQuery;
