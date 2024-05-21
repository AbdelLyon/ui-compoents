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
	pathname: string;
	className?: string;
	setOpenDropdown?: (isOpen: boolean) => void;
	btnIcon?: IconProp;
	isOpenDropdown?: boolean;
};

export type NavbarProps = {
	applicationName?: string;
	user?: string;
	accountNavigation: string[];
	className?: string;
	toggleTheme?: boolean;
	setOpenDropdown?: (isOpen: boolean) => void;
	isOpenDropdown?: boolean;
	Logo?: ReactNode;
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
