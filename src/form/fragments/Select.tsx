import { memo, useCallback } from 'react';
import { SelectProps } from '../types';
import { Command, CommandItem, CommandList } from '@/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/utils';
import InputCustom from '@/form/InputCustom';
import { PopoverTrigger } from '@/ui/popover';

const Trigger = ({
	width = '400px',
	className,
	value,
	selectionKeys = [],
	placeholder,
	options = [],
}: Partial<SelectProps>) => {
	const valueSelected = options?.find((item) => item?.id === value) ?? {};

	return (
		<PopoverTrigger asChild>
			<div
				className={cn(
					'flex h-11 w-[400px] cursor-pointer items-center justify-between rounded-md border border-foreground bg-transparent px-3',
					className
				)}
				style={{
					width,
				}}>
				<p
					className={cn('truncate text-[13px] ', {
						'text-muted-foreground opacity-50': !value,
					})}>
					{value
						? selectionKeys?.map((s) => `${valueSelected?.[s]} `)
						: placeholder}
				</p>
				<ChevronsUpDown className='h-[12px ] right-4 w-[12px] shrink-0 opacity-50' />
			</div>
		</PopoverTrigger>
	);
};

const SearchOption = memo(
	({
		error = ' ',
		onSearchChange,
		placeholderSearch = '',
	}: Partial<SelectProps>) => {
		const handleSearchChange = useCallback(
			(value: string) => onSearchChange?.(value),
			[onSearchChange]
		);

		return (
			<InputCustom
				name='search'
				className={`${error && 'border-red-600/50'}`}
				handelChange={handleSearchChange}
				placeholder={placeholderSearch}
				classNameError='text-[12px] text-red-600/70'
				type='search'
			/>
		);
	}
);

const Select = memo(
	({
		placeholder = '',
		options = [],
		onSelectChange,
		value = '',
		setOpen,
		selectionKeys = [],
		observerRef,
	}: SelectProps) => {
		const handleSelectChange = useCallback(
			(currentValue: string) => {
				const newValue = options?.find((item) => {
					return item?.id === currentValue;
				});
				if (newValue && newValue.id !== value) {
					onSelectChange(newValue);
				} else {
					onSelectChange({ id: '' });
				}
				setOpen?.(false);
			},
			[onSelectChange, options, value, setOpen]
		);

		return (
			<Command>
				<CommandList className='pr-4'>
					<CommandItem
						className='mb-1 py-2 text-sm'
						value={placeholder}
						onSelect={handleSelectChange}>
						{placeholder}
					</CommandItem>
					{options?.map((item, index) => (
						<CommandItem
							key={item?.id}
							ref={options.length === index + 1 ? observerRef : null}
							className='flex justify-between py-2'
							value={item?.id}
							onSelect={handleSelectChange}>
							<p className='truncate'>
								{selectionKeys.map((s) => `${item?.[s]} `)}
							</p>
							<Check
								className={cn(
									'mr-2 h-4 w-4',
									value === item?.id
										? 'text-green-600 opacity-100'
										: 'opacity-0'
								)}
							/>
						</CommandItem>
					))}
				</CommandList>
			</Command>
		);
	}
);

export { Trigger, SearchOption, Select };
