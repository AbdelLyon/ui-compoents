import { Button } from "@/shared/ui/button";
import { ButtonProps } from "./types";
import { cn } from "../shared/lib/utils";

const CustomButton = ({
  icon,
  iconPosition,
  ...props
}: ButtonProps<true> | ButtonProps<false>): JSX.Element => {
  return (
    <Button
      {...props}
      className={cn(props.className, {
        "flex flex-row-reverse": iconPosition === "left" && icon,
      })}
    >
      <span className="flex-1">{props.children}</span>
      {icon ?? null}
    </Button>
  );
};

export default CustomButton;
