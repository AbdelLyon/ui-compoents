import { Navbar } from '@/navbar/Navbar';
import { Sidebar } from '@/sidebar/Sidebar';
import { cn } from '@/utils';
import { useState } from 'react';
import { DailyAppsLayoutProps } from '@/types';
import { SidebarResponsive } from '@/sidebar/SidebarResponsive';
// import { SidebarResponsive } from '@/sidebar/SidebarResponsive';

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
			<div className='relative z-20 flex w-full'>
				{/* <Sidebar
					btnIcon={sidebar.btnIcon}
					navigation={sidebar.navigation}
					pathname={sidebar.pathname}
					className='hidden md:flex '
				/> */}
				<SidebarResponsive
					btnIcon={sidebar.btnIcon}
					navigation={sidebar.navigation}
					pathname={sidebar.pathname}
					className='flex'
				/>

				<main
					// fixer le responsive endessous se 300px
					className={cn(
						'ml-24 mr-10 md:mr-16 md:ml-16 mt-10 flex-1 bg-background min-h-[83vh] h-full relative -z-10',
						classNameContainer
					)}>
					{children}
				</main>
				{/* {isOpen && (
					<div className='absolute top-0 w-screen min-h-screen backdrop-blur-sm -z-10' />
				)} */}
			</div>
		</div>
	);
};
