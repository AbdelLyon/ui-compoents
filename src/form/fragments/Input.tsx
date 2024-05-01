import { Eye, EyeOff, Mail, Search } from 'lucide-react';
import { cn } from '@/utils';
import { Dispatch } from 'react';

type Props = { className?: string };

export const PassowrIcon = ({
	className,
	setIsPasswordVisible,
	isPasswordVisible,
}: Props & {
	setIsPasswordVisible: Dispatch<React.SetStateAction<boolean>>;
	isPasswordVisible: boolean;
}) => {
	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	return (
		<>
			{isPasswordVisible ? (
				<EyeOff
					id='eye-icon'
					className={`text-muted-foreground right-3 ${className} absolute`}
					style={{ top: '50%', transform: 'translateY(-50%)' }}
					size={16}
					onClick={togglePasswordVisibility}
				/>
			) : (
				<Eye
					className={`text-muted-foreground right-3 ${className} absolute`}
					style={{ top: '50%', transform: 'translateY(-50%)' }}
					size={16}
					onClick={togglePasswordVisibility}
				/>
			)}
		</>
	);
};

export const SearchIcon = ({ className }: Props) => (
	<Search
		size={13}
		className={cn(`text-muted-foreground right-3 -z-10 ${className} absolute`)}
		style={{ top: '50%', transform: 'translateY(-50%)' }}
	/>
);

export const MailIcon = ({ className }: Props) => (
	<Mail
		size={13}
		className={cn(`text-muted-foreground right-3 ${className} absolute`)}
		style={{ top: '50%', transform: 'translateY(-50%)' }}
	/>
);
