import { cn } from '@/utils';
import { CustomCardProps } from './types';
import { ReactNode } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/ui/card';

export const CardImage = ({
	children,
	height,
	width,
	className,
}: {
	children: ReactNode;
	height?: string | number;
	width?: string | number;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				'relative overflow-hidden transition-transform duration-300 ease-in-out transform',
				className
			)}
			style={{ minHeight: 100, minWidth: 150, height, width }}>
			{children}
		</div>
	);
};

export const CustomCardTitle = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<CardHeader>
			<CardTitle className={className}>{children}</CardTitle>
		</CardHeader>
	);
};

export const CustomCardContent = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<CardContent className={cn('flex-1', className)}>{children}</CardContent>
	);
};

export const CustomCardFooter = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return <CardFooter className={className}>{children}</CardFooter>;
};

export const CustomCard = ({
	className,
	width,
	height,
	clickable = false,
	children,
}: CustomCardProps) => {
	return (
		<Card
			className={cn(
				'border-border relative flex flex-col',
				{
					'border-border rounded-b-sm cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg':
						clickable,
				},
				className
			)}
			style={{ minWidth: 200, minHeight: 200, width, height }}>
			{children}
		</Card>
	);
};

export default CustomCard;
