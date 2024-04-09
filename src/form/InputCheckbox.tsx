import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "../shared/lib/utils";
import { Checkbox } from "../shared/ui/checkbox";

type Props = {
  htmlForm?: string;
  label?: string;
  value: boolean;
  onChange: (checked: CheckedState) => void;
  name: string;
  className?: string;
  style?: any;
};

export const InputCheckbox = ({
  htmlForm,
  label,
  value,
  onChange,
  name,
  className,
  style,
}: Props) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox
        checked={value}
        onCheckedChange={onChange}
        name={name}
        style={style}
      />
      <label className="text-sm" htmlFor={htmlForm}>
        {label}
      </label>
    </div>
  );
};
