import { SidebarProps } from '@/types';
import { cn } from '@/utils';
import CustomButton from '@/button/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SidebarResponsiveMenu } from './SidebarResponsiveMenu';

export const SidebarResponsive = ({
	navigation,
	pathname,
	className,
	btnIcon,
}: SidebarProps) => {
	return (
		<aside
			className={cn(
				'fixed inset-y-0 left-0 z-10 w-14 flex-col md:w-[290px] border-r border-foreground bg-sidebar flex mt-16 h-screen md:mt-0 md:static md:px-4',
				className
			)}>
			<div className='md:sticky top-16'>
				<nav className='flex flex-col items-center gap-4 px-2 mt-4'>
					<CustomButton
						icon={
							<FontAwesomeIcon icon={btnIcon as IconProp} className='h-3 w-3' />
						}
						iconPosition='left'
						size='sm'
						className='bg-primary md:w-full'>
						{<span className='hidden md:block'>Ajouter</span>}
					</CustomButton>
					<div className='bg-foreground w-full h-[2px]' />

					<SidebarResponsiveMenu
						navigation={navigation}
						pathname={pathname}
						className='w-full'
					/>
				</nav>
			</div>
		</aside>
	);
};
