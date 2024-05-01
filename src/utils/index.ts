import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (str: string): string =>
	str?.charAt(0).toUpperCase() + str?.slice(1);

export const concatenateWithSpace = (
	...strings: (string | undefined)[]
): string => strings?.filter(Boolean).join(' ');

export const startsWith = (str: string, prefix: string): boolean =>
	str?.startsWith(prefix);

export const endsWith = (str: string, suffix: string): boolean =>
	str?.endsWith(suffix);

export const toLowerCase = (str: string): string => str?.toLowerCase();

export const toUpperCase = (str: string): string => str?.toUpperCase();

export const trim = (str: string): string => str?.trim();

export const reverse = (str: string): string =>
	str?.split('').reverse().join('');
