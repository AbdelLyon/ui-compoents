import { cn } from "../shared/lib/utils";
import { Checkbox } from "../shared/ui/checkbox";
import { Label } from "../shared/ui/label";
import { CheckboxProps } from "./types";

const InputCheckbox = (props: Omit<CheckboxProps, "type">) => {
  const { className, htmlForm, label, ...rest } = props;
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox {...rest} />
      <Label htmlFor={htmlForm}>{label}</Label>
    </div>
  );
};

export default InputCheckbox;
