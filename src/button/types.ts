import { ButtonHTMLAttributes, ReactElement } from "react";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  icon?: ReactElement;
  iconPosition?: "right" | "left";
}

export type ButtonProps<T extends boolean> = T extends true
  ? { icon: ReactElement; iconPosition: "right" | "left" } & Props
  : { icon?: ReactElement; iconPosition?: never } & Props;
