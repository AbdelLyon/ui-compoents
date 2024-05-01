import { Button } from '@/button';
import { cn } from '@/utils';
import { ToggleTheme } from '@/theme';
import { NavbarProps } from '@/types';
import { AlignLeft, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export const Navbar = ({
	title,
	username,
	navigation,
	className,
	toggleTheme,
	toggleDropdownSidebar,
}: NavbarProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement>(null);

	// 1 :il faudra faire un hook personaliser dans @xefi/hooks pour la logique ci dessous
	// 2 : il faudra gerer le responsive avec un hook eu lieu d'utiliser les class tailwind

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<header
			className={cn(
				'h-16 box-shadow-header flex fixed w-full z-40 top-0 items-center dark:border-b border-foreground bg-white dark:bg-background shadow-lg dark:shadow-none px-4 md:pl-0 md:pr-4',
				className
			)}>
			<div className='border-foreground flex items-center border-r md:min-w-[290px]'>
				<AlignLeft
					className='size-5 cursor-pointer md:hidden dark:text-white'
					onClick={toggleDropdownSidebar}
				/>

				<h1 className='hidden w-full text-center md:block'>{title}</h1>
			</div>
			<div className='mx-4 flex w-full items-center justify-between text-black'>
				<h1 className='cursor-default select-none pl-2 text-2xl font-semibold dark:text-white'>
					{title}
				</h1>
				<nav className='flex items-center gap-4'>
					{toggleTheme && <ToggleTheme className='dark:text-white' />}
					<ul className='flex items-center'>
						<li className='relative inline-block text-left' ref={dropdownRef}>
							<Button
								// eslint-disable-next-line tailwindcss/no-custom-classname
								className='bg-foreground dark:bg-background dark:border-foreground hover:bg-foreground w-[200px] border border-gray-200 font-medium dark:text-white '
								variant='outline'
								iconPosition='left'
								icon={<User className='size-4' />}
								onClick={() => setIsOpen(!isOpen)}>
								<span className='mt-1'>
									{/* {toUpperCase(username)} */}
									{username}
								</span>
							</Button>

							<div
								className={cn(
									'absolute right-0 top-[50px] z-50 min-w-[200px] origin-top-right opacity-0 transition-opacity duration-100 ease-in',
									{
										'opacity-100 rounded-md bg-background shadow-lg border border-foreground focus:outline-none':
											isOpen,
									}
								)}>
								{navigation?.map((item: string, index: number) => (
									<Button
										key={index}
										className={cn(
											'py-2 cursor-pointer border-none flex justify-start gap-3 dark:text-white w-full transition-colors duration-150 hover:bg-foreground',
											{
												'rounded-t-none': index === navigation.length - 1,
												'rounded-b-none': index === 0,
											}
										)}
										variant='outline'>
										{item}
									</Button>
								))}
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};
