import { ButtonHTMLAttributes, ReactElement } from "react";

// Types des variantes de bouton
export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

// Types des tailles de bouton
export type ButtonSize = "default" | "sm" | "lg" | "icon";

// Propriétés du composant bouton
export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  icon?: ReactElement;
  iconPosition?: "right" | "left";
}

// Utilisation de types génériques pour la définition des props
export type ButtonProps<T extends boolean> = T extends true
  ? { icon: ReactElement; iconPosition: "right" | "left" } & Props
  : { icon?: ReactElement; iconPosition?: never } & Props;
