import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const ReactQueryProvider = ({
	children,
}: Readonly<React.PropsWithChildren>) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 15,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
