import { cn } from '@/utils';
import { Navigation, SidebarProps } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/ui/tooltip';

export const SidebarResponsiveMenu = ({
	navigation,
	pathname,
	className,
}: Partial<SidebarProps>) => {
	return (
		<div className={className}>
			{navigation?.map((item: Navigation) => {
				return (
					!item.hasAccess && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href={item.navigate}
										key={item.navigate}
										className={cn(
											'flex items-center justify-center md:gap-4 md:justify-start w-full px-3 py-3 mb-1 cursor-pointer menu-transition transition-colors rounded-md line-transition text-white',
											{
												'opacity-100 bg-LinksSidebar':
													pathname === item.navigate,

												'opacity-70 transition-colors duration-150 hoverLinksSidebar ':
													pathname !== item.navigate,
											}
										)}>
										<FontAwesomeIcon
											icon={item.icon}
											className={cn({
												'w-5 h-5': true,
											})}
										/>
										<span className='sr-only md:not-sr-only'>{item.name}</span>
									</a>
								</TooltipTrigger>
								<TooltipContent side='right'>{item.name}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)
				);
			})}
		</div>
	);
};
