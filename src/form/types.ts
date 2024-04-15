import { Dispatch, ReactElement } from "react";

export interface CommonInputProps {
  label?: string;
  error?: string;
  name?: string;
  className?: string;
  classNameError?: string;
  value?: string;
  width?: string | number;
  placeholder?: string;
}

export interface InputProps extends CommonInputProps {
  type?:
    | "text"
    | "number"
    | "date"
    | "datetime-local"
    | "email"
    | "password"
    | "search";
  handelChange?: (value: string) => void;
  Icon?: ReactElement;
  classNameContainer?: string;
  classNameIcon?: string;
  onOpenChange?: (open: boolean) => void;
  autoComplete?: string;
  classNameLabel?: string;
}

export interface CheckboxProps extends CommonInputProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  htmlForm?: string;
}

export interface SelectProps extends CommonInputProps {
  onSelectChange: (value: ExtendedProps) => void;
  setOpen?: Dispatch<React.SetStateAction<boolean>>;
  observerRef?: (node?: Element | null) => void;
  isSearchable?: boolean;
  options: ExtendedProps[];
  onSearchChange?: (value: string) => void;
  selectionKeys: (keyof ExtendedProps)[];
  fetchNextPage?: () => void;
  placeholderSearch?: string;
  isFetchingNextPage?: boolean;
}

export type ExtendedProps = {
  [key: string]: string;
};
