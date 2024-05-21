import { cn } from '@/utils';
import { Navigation, SidebarProps } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@bradgarropy/next-link';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/ui/tooltip';

export const SidebarMenu = ({
	navigation,
	pathname,
	className,
	isOpenDropdown,
}: Partial<SidebarProps>) => {
	return (
		<div className={className}>
			{navigation?.map((item: Navigation) => {
				return (
					!item.hasAccess && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to={item.navigate}
										key={item.navigate}
										className={cn(
											'flex items-center justify-center w-full px-3 py-2 mb-3 cursor-pointer menu-transition transition-colors rounded-md line-transition text-white md:justify-start md:gap-4',
											{
												'opacity-100 bg-sidebar': pathname === item.navigate,

												'opacity-70 transition-colors duration-150 hover:bg-sidebar ':
													pathname !== item.navigate,

												'justify-start gap-4': isOpenDropdown,
											}
										)}>
										<FontAwesomeIcon icon={item.icon} className='w-5 h-5' />
										<span
											className={cn('sr-only md:not-sr-only', {
												'not-sr-only': isOpenDropdown,
											})}>
											{item.name}
										</span>
									</Link>
								</TooltipTrigger>
								{!isOpenDropdown && (
									<TooltipContent side='right'>{item.name}</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					)
				);
			})}
		</div>
	);
};
