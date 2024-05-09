import { Input } from '@/ui/input';
import { debounce } from '@mui/material';
import { InputProps } from './types';
import { cn } from '@/utils';
import { HTMLAttributes, useRef, useState, useEffect, memo } from 'react';
import { MailIcon, PassowrIcon, SearchIcon } from './fragments/Input';
import { Label } from '@/ui/label';

export const InputCustom = memo(
	({
		type = 'text',
		classNameContainer,
		label,
		classNameError,
		classNameIcon,
		handelChange,
		Icon,
		error,
		value,
		placeholder,
		className,
		classNameLabel,
		width = '100%',
	}: InputProps & HTMLAttributes<HTMLInputElement>) => {
		const [searchValue, setSearchValue] = useState('');
		const ref = useRef<HTMLInputElement | null>(null);
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);

		const debouncedHandleChange = debounce((e) => {
			handelChange?.(e.target.value);
			if (type === 'search') {
				setSearchValue(e.target.value);
			}
		}, 500);

		useEffect(() => {
			if (ref.current && value !== undefined) {
				ref.current.value = value;
			}
		}, [value]);

		return (
			<div className='mb-3'>
				{label && <Label className={classNameLabel}>{label}</Label>}
				<div
					className={cn('relative mt-1', classNameContainer)}
					style={{ width }}>
					<Input
						onChange={(e) => debouncedHandleChange(e)}
						type={isPasswordVisible ? 'text' : type}
						ref={ref}
						placeholder={placeholder}
						className={cn('text-sm', className)}
						id='input'
					/>
					{Icon && (
						<div
							className='text-muted-foreground right-3 absolute'
							style={{ top: '50%', transform: 'translateY(-50%)' }}>
							{Icon}
						</div>
					)}
					{type === 'password' && (
						<PassowrIcon
							className={classNameIcon}
							isPasswordVisible={isPasswordVisible}
							setIsPasswordVisible={setIsPasswordVisible}
						/>
					)}
					{type === 'search' && searchValue === '' && (
						<SearchIcon className={classNameIcon} />
					)}
					{type === 'email' && <MailIcon className={classNameIcon} />}
				</div>
				{error && (
					<p className={cn('text-red-600 mt-1 ', classNameError)}>{error}</p>
				)}
			</div>
		);
	}
);
