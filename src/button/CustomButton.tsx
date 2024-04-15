import { Button } from "@/shared/ui/button";
import { ButtonProps } from "./types";
import { cn } from "../shared/lib/utils";

const CustomButton = ({
  icon = undefined,
  iconPosition = "right",
  ...props
}: ButtonProps<true> | ButtonProps<false>): JSX.Element => {
  return (
    <Button
      {...props}
      className={cn(props.className, {
        "flex flex-row-reverse": iconPosition === "left" && icon,
      })}
    >
      {iconPosition === "right" && (
        <span className="flex-1">{props.children}</span>
      )}
      {icon ?? null}
      {iconPosition === "left" && (
        <span className="flex-1">{props.children}</span>
      )}
    </Button>
  );
};

export default CustomButton;
