import { cn } from '@/utils';
import { Checkbox } from '@/ui/checkbox';
import { Label } from '@/ui/label';
import { CheckboxProps } from './types';

export const InputCheckbox = (props: Omit<CheckboxProps, 'type'>) => {
	const { className, htmlForm, label, ...rest } = props;
	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<Checkbox {...rest} />
			<Label htmlFor={htmlForm}>{label}</Label>
		</div>
	);
};
