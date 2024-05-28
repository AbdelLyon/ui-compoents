import { useInfiniteQuery as useInfiniteReactQuery } from '@tanstack/react-query';
import { Query } from './types';

export const useInfiniteQuery = <Data, Request>({
	queryKey,
	request,
	search,
	enabled,
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
		getNextPageParam: (lastPage, pages, pageParam = 10) => {
			const nextPage = pages.length * pageParam + 1;

			if (lastPage.length < pageParam) return undefined;

			return nextPage;
		},
		enabled,
	});

	const flattenedData = data?.pages.flatMap((data) => data) ?? [];

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
