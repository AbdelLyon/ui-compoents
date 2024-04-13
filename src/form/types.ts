import { ReactElement } from "react";
import { FormikErrors } from "formik";
import { PopoverProps } from "@radix-ui/react-popover";

// Type commun à tous les éléments d'entrée
export interface CommonInputProps {
  label?: string;
  error?: string | FormikErrors<string>;
  name?: string;
  className?: string;
  classNameError?: string;
  value?: string;
}

// Type commun aux éléments d'entrée de type 'input'
export interface InputProps extends CommonInputProps {
  type?:
    | "text"
    | "number"
    | "date"
    | "datetime-local"
    | "email"
    | "password"
    | "search";
  placeholder?: string;
  handelChange?: (value: string) => void;
  Icon?: ReactElement;
  classNameContainer?: string;
  classNameIcon?: string;
  onOpenChange?: (open: boolean) => void;

  autoComplete?: string;
}

// Type pour les cases à cocher
export interface CheckboxProps extends CommonInputProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  htmlForm?: string;
}

// Type pour les sélecteurs avec fonction de recherche
export interface SelectSearchProps<T> extends PopoverProps, CommonInputProps {
  options: T[];
  selectionKeys: string[];
  onSelectChange: (value: T) => void;
  onSearchChange?: (value: string) => void;
  fetchNextPage?: () => void;
  placeholderSearch?: string;
  placeholder?: string;
  value: string;
  isSearchable?: boolean;
  isFetchingNextPage?: boolean;
  isFetching?: boolean;
  width?: number;
}

export type ExtendedProps = { id: string; [key: string]: string };
