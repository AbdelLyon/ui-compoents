/* eslint-disable tailwindcss/no-custom-classname */
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/utils';
import { CheckIcon } from 'lucide-react';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'peer h-[18px] w-[18px] shrink-0 rounded-sm border border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-muted data-[state=checked]:text-primary-foreground',
			className
		)}
		{...props}>
		<CheckboxPrimitive.Indicator
			className={cn('flex items-center justify-center text-current')}>
			<CheckIcon className='text-primary size-4 font-bold' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
