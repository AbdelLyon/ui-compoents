import { useEffect, memo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/utils';
import { RenderLoader } from '@/ui/LoadingIndicator';
import { SelectProps } from './types';
import { Popover, PopoverContent } from '@/ui/popover';
import { SearchOption, Select, Trigger } from './fragments/Select';
import { Label } from '@/ui/label';

export const SelectSearch = memo(
	({
		onSelectChange,
		options = [],
		label,
		placeholder,
		isSearchable,
		width = '100%',
		value,
		error,
		isFetchingNextPage,
		fetchNextPage,
		onSearchChange,
		placeholderSearch,
		selectionKeys = [],
		className,
		classNameError,
	}: SelectProps) => {
		const { ref, inView } = useInView();
		const [open, setOpen] = useState(false);

		const datas = options.map((item) => ({
			...item,
			id: item.id?.toString(),
		}));

		useEffect(() => {
			if (inView && fetchNextPage) {
				fetchNextPage();
			}
		}, [inView, fetchNextPage]);

		return (
			<div data-testid='select-element'>
				<Popover open={open} onOpenChange={setOpen}>
					{label && (
						<Label style={{ width }} className='text-start'>
							{label}
						</Label>
					)}
					<Trigger
						options={datas}
						selectionKeys={selectionKeys}
						value={value}
						className={className}
						placeholder={placeholder}
						width={width}
					/>
					<PopoverContent className={cn('mt-1 p-3 w-full')} style={{ width }}>
						{isSearchable && (
							<SearchOption
								error={error}
								onSearchChange={onSearchChange}
								placeholderSearch={placeholderSearch}
							/>
						)}

						<Select
							onSelectChange={onSelectChange}
							options={datas}
							observerRef={ref}
							selectionKeys={selectionKeys}
							setOpen={setOpen}
							value={value}
							placeholder={placeholder}
							width={width}
						/>
						{isFetchingNextPage && (
							<div className='fixed top-1 left-0 bottom-0 h-full w-full flex justify-center items-center backdrop-blur-[2px]'>
								<RenderLoader className='fixed bottom-2 flex justify-center text-primary text-center right-0 w-full z-10' />
							</div>
						)}
					</PopoverContent>
					{error && (
						<p
							className={cn(
								'text-red-600/80 mt-1 text-[12px] text-start',
								classNameError
							)}
							style={{ width }}>
							{error}
						</p>
					)}
				</Popover>
			</div>
		);
	}
);

export default SelectSearch;
