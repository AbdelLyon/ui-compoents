import { Loader } from 'lucide-react';

export const RenderLoader = ({ className }: { className: string }) => (
	<div className={className}>
		<Loader size={21} className='mb-1 animate-spin font-extrabold' />
	</div>
);

export const RenderLoadingIndicator = ({
	isFetchingNextPage,
}: {
	isFetchingNextPage: boolean;
}) => (
	<>
		{isFetchingNextPage && (
			<div className='fixed inset-y-0 left-0 flex size-full items-center justify-center backdrop-blur-[2px] '>
				<RenderLoader className='fixed bottom-2 right-0 z-10 flex w-full justify-center text-center' />
			</div>
		)}
	</>
);
