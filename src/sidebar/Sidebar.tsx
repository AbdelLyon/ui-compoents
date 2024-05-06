import { Settings } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/ui/tooltip';
import { SidebarMenu } from './SidebarMenu';
import { SidebarProps } from '@/types';
import { cn } from '@/utils';

export const Sidebar = ({
	navigation,
	Button,
	pathname,
	className,
}: SidebarProps) => {
	return (
		<aside
			className={cn(
				'fixed inset-y-0 left-0 z-10 w-14 flex-col border-r border-foreground bg-sidebar flex mt-16',
				className
			)}>
			<nav className='flex flex-col items-center gap-4 px-2 mt-4'>
				{Button && (
					<>
						{Button}
						<div className='bg-foreground  w-full h-[1px]' />
					</>
				)}

				<SidebarMenu navigation={navigation} pathname={pathname} />
			</nav>
			<nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<a
								href='#'
								className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
								<Settings className='h-5 w-5' />
								<span className='sr-only'>Settings</span>
							</a>
						</TooltipTrigger>
						<TooltipContent side='right'>Settings</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
		</aside>
	);
};
