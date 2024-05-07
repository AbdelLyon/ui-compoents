import { cn } from '@/utils';
import { SidebarMenu } from './SidebarMenu';
import { SidebarProps } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomButton from '@/button/CustomButton';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const Sidebar = ({
	navigation,
	pathname,
	className,
	btnIcon,
}: SidebarProps) => {
	return (
		<aside
			className={cn(
				'min-w-[290px] w-[290px] border-r border-foreground bg-sidebar relative min-h-[93vh]',
				className
			)}>
			{/* <img
				src={bgSidebar}
				alt='bg-sidebar'
				className='object-contain right-0 -top-10 absolute'
			/> */}
			<div className='fixed w-[290px] px-4'>
				<CustomButton
					icon={
						<FontAwesomeIcon icon={btnIcon as IconProp} className='h-5 w-5' />
					}
					iconPosition='left'
					className='mt-4 w-full'>
					Ajouter
				</CustomButton>
				<div className='bg-foreground my-6 h-[1px]' />
				<SidebarMenu navigation={navigation} pathname={pathname} />
			</div>
		</aside>
	);
};
