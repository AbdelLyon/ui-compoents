import { cn } from '@/utils';
import { SidebarMenu } from './SidebarMenu';
import { SidebarProps } from '@/types';

export const Sidebar = ({
	navigation,
	Button,
	pathname,
	className,
}: SidebarProps) => {
	return (
		<div className={cn('bg-sidebar min-h-screen p-4 z-40', className)}>
			<div className='fixed'>
				{Button && (
					<div className='mt-20'>
						{Button}
						<div className='bg-LinksSidebar my-6 h-px' />
					</div>
				)}
				<SidebarMenu navigation={navigation} pathname={pathname} />
			</div>
		</div>
	);
};
