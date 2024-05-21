import { Button } from '@/ui/button';
import { ButtonProps } from './types';
import { cn } from '@/utils';

export const CustomButton = ({
	icon = undefined,
	iconPosition = 'right',
	className,
	children,
	...props
}: ButtonProps<true> | ButtonProps<false>) => {
	return (
		<Button
			{...props}
			className={cn(className, {
				'flex flex-row-reverse': iconPosition === 'left' && icon,
			})}>
			<span
				className={cn({
					'flex-1': iconPosition === 'left' || iconPosition === 'right',
				})}>
				{children}
			</span>
			{icon}
		</Button>
	);
};
