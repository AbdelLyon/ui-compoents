import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlignLeft, User } from 'lucide-react';
import { NavbarProps, Navigation } from '@/types';
import { cn } from '@/utils';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '@/ui/menubar';
import { ToggleTheme } from '@/theme';
import { Button } from '@/button';

const AppLogo = ({
	Logo,
	className,
}: {
	Logo: React.ReactNode;
	className?: string;
}) => {
	return <div className={cn('hidden md:block', className)}>{Logo}</div>;
};

const NavigationItems = ({
	pagesNavigation,
}: {
	pagesNavigation: Navigation[];
}) => {
	return (
		<ul className='hidden md:flex gap-4 dark:text-white text-sm ml-8'>
			{pagesNavigation?.map((item: Navigation) => (
				<li key={item.name} className='flex items-center gap-2'>
					{item.icon && <FontAwesomeIcon icon={item.icon} />}
					<a href={item.navigate}>{item.name}</a>
				</li>
			))}
		</ul>
	);
};

const MenuBarNavigation = ({
	navigation,
	Icon,
}: {
	navigation?: string[] | Navigation[];
	Icon: React.ReactNode;
}) => {
	return (
		<Menubar className='border-none shadow-none'>
			<MenubarMenu>
				<MenubarTrigger>{Icon}</MenubarTrigger>
				<MenubarContent className='text-sm font-medium w-[208px]'>
					{navigation?.map((item: string | Navigation, index: number) => (
						<MenubarItem
							key={index}
							className='flex items-center gap-1 dark:text-white'>
							{typeof item === 'string' ? (
								item
							) : (
								<>
									<FontAwesomeIcon icon={item.icon} />
									<a href={item.navigate}>{item.name}</a>
								</>
							)}
						</MenubarItem>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

const DailyAppsNavbar = ({
	applicationName,
	user,
	accountNavigation,
	className,
	setOpenDropdown,
	isOpenDropdown,
	Logo,
}: NavbarProps) => {
	return (
		<header
			className={cn(
				'h-16 box-shadow-header flex fixed w-full z-40 top-0 items-center border-b border-border bg-white dark:bg-background shadow-lg dark:shadow-none px-4',
				className
			)}>
			<AppLogo
				Logo={Logo}
				className='w-[275px] border-r border-border justify-center'
			/>
			<AlignLeft
				className='md:hidden h-5 w-5 cursor-pointer  dark:text-white'
				onClick={() => setOpenDropdown?.(!isOpenDropdown)}
			/>
			<div className='flex flex-1 w-full items-center text-black pl-2'>
				<h1 className='hidden md:block cursor-default select-none text-2xl font-semibold dark:text-white'>
					{applicationName}
				</h1>
				<nav className='flex items-center gap-4 w-full justify-end'>
					<ToggleTheme className='dark:text-white' />
					<MenuBarNavigation
						navigation={accountNavigation}
						Icon={
							<>
								<div className='hidden md:block px-3 relative dark:bg-background w-[200px] py-2 rounded-md cursor-pointer border border-border font-medium dark:text-white'>
									<User className='size-5 absolute' />
									<p className='ml-8 pr-8 w-full truncate'>{user}</p>
								</div>
								<User className='size-5 md:hidden dark:text-white dark:bg-background cursor-pointer' />
							</>
						}
					/>
				</nav>
			</div>
		</header>
	);
};

const Navbar = ({
	user,
	pagesNavigation,
	accountNavigation = [],
	className,
	Logo,
}: Partial<NavbarProps> & { pagesNavigation: Navigation[] }) => {
	return (
		<header
			className={cn(
				'h-16 box-shadow-header flex sticky w-full z-40 top-0 items-center border-border bg-white dark:bg-background shadow-lg dark:shadow-none px-4',
				className
			)}>
			{Logo && <AppLogo Logo={Logo} />}

			<div className='flex flex-1 w-full items-center text-black pl-2'>
				<nav className='flex items-center w-full'>
					<NavigationItems pagesNavigation={pagesNavigation} />

					<MenuBarNavigation
						navigation={pagesNavigation}
						Icon={
							<AlignLeft className='h-5 w-5 cursor-pointer  dark:text-white' />
						}
					/>
					<div className='flex items-center gap-4 w-full justify-end'>
						<ToggleTheme className='dark:text-white' />
						{accountNavigation && accountNavigation.length > 0 && (
							<MenuBarNavigation
								navigation={accountNavigation}
								Icon={
									<Button
										className='bg-foreground dark:bg-background dark:border-border hover:bg-foreground w-[200px] border border-gray-200 font-medium dark:text-white'
										variant='outline'
										iconPosition='left'
										icon={<User className='size-4' />}>
										<span className='mt-1'>{user}</span>
									</Button>
								}
							/>
						)}
					</div>
				</nav>
			</div>
		</header>
	);
};

export { Navbar, DailyAppsNavbar };
