import { Navbar } from '@/navbar/Navbar';
import { Sidebar } from '@/sidebar/Sidebar';
import { cn } from '@/utils';
import { useState } from 'react';
import { DailyAppsLayoutProps } from '@/types';

export const DailyAppsLayout = ({
	header,
	children,
	classNameContainer,
	sidebar,
}: DailyAppsLayoutProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const setOpenDropdown = (isOpen: boolean) => {
		setIsOpen(isOpen);
	};

	return (
		// eslint-disable-next-line tailwindcss/no-custom-classname
		<div className='bg-foreground min-h-screen w-full'>
			<Navbar
				title={header.title}
				navigation={header.navigation}
				username={header.username}
				className={header.className}
				toggleTheme={header.toggleTheme}
				setOpenDropdown={setOpenDropdown}
				isOpenDropdown={isOpen}
			/>
			<div className='relative z-20 flex min-h-screen w-full'>
				<Sidebar
					Button={sidebar.Button}
					navigation={sidebar.navigation}
					pathname={sidebar.pathname}
				/>

				<main
					// fixer le responsive endessous se 300px
					className={cn(
						'mr-12 ml-24 mt-12 flex-1 bg-background min-h-[80vh] relative -z-10',
						classNameContainer
					)}>
					{children}
				</main>
				{isOpen && (
					<div className='absolute top-0 w-screen min-h-screen backdrop-blur-sm -z-10' />
				)}
			</div>
		</div>
	);
};
