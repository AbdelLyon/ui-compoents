import { Button } from "@/shared/ui/button";
import { type ButtonProps as Props } from "./types";
import { ReactElement } from "react";
import { cn } from "../shared/lib/utils";

type ButtonProps =
  | ({
      icon: ReactElement;
      iconPosition: "right" | "left";
    } & Props)
  | ({
      icon?: ReactElement;
      iconPosition?: never;
    } & Props);

const CustomButton = ({
  icon,
  iconPosition,
  ...props
}: ButtonProps): JSX.Element => {
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
