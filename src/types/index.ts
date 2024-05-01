import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';

export type Navigation = {
	hasAccess: boolean;
	navigate: string;
	icon: IconProp;
	name: string;
};

export type SidebarProps = {
	navigation: Navigation[];
	iconSidebar?: string;
	Button?: ReactNode;
	pathname: string;
	className?: string;
};

export type NavbarProps = {
	title: string;
	username: string;
	navigation: string[];
	className?: string;
	toggleTheme?: boolean;
	toggleDropdownSidebar?: () => void;
};

export type DailyAppsLayoutProps = {
	header: NavbarProps;
	sidebar: SidebarProps;
	children: ReactNode;
	classNameContainer?: string;
};

//button
import { ButtonHTMLAttributes, ReactElement } from 'react';

export type ButtonVariant =
	| 'default'
	| 'destructive'
	| 'outline'
	| 'secondary'
	| 'ghost'
	| 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	asChild?: boolean;
	icon?: ReactElement;
	iconPosition?: 'right' | 'left';
}

export type ButtonProps<T extends boolean> = T extends true
	? { icon: ReactElement; iconPosition: 'right' | 'left' } & BtnProps
	: { icon?: ReactElement; iconPosition?: never } & BtnProps;
