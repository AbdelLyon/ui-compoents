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

export interface SelectProps<Data> extends CommonInputProps {
  onSelectChange: (value: Data) => void;
  setOpen?: Dispatch<React.SetStateAction<boolean>>;
  observerRef?: (node?: Element | null) => void;
  isSearchable?: boolean;
  options: Data[];
  onSearchChange?: (value: string) => void;
  selectionKeys: (keyof Data)[];
  fetchNextPage?: () => void;
  placeholderSearch?: string;
  isFetchingNextPage?: boolean;
}

export type ExtendedProps = {
  [key: string]: string;
};
