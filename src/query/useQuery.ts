import { QueryKey, useQuery } from "@tanstack/react-query";
import { Search } from "./queryTypes";

export type UseCustomQuery<T> = {
  queryKey: QueryKey;
  request: ({}) => Promise<T[]>;
  search: Partial<Search>;
  enabled?: boolean;
};

const useCustomQuery = <T>({
  queryKey,
  request,
  search: { includes, filters, sorts, instructions, scopes, gates },
  enabled,
}: UseCustomQuery<T>) => {
  const { data, isLoading, isFetching, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      request({
        search: {
          ...(includes && includes.length > 0 && { includes }),
          ...(filters && filters.length > 0 && { filters }),
          ...(sorts && sorts.length > 0 && { sorts }),
          ...(instructions && instructions.length > 0 && { instructions }),
          ...(scopes && scopes.length > 0 && { scopes }),
          ...(gates && gates.length > 0 && { scopes }),
        },
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

export default useCustomQuery;
