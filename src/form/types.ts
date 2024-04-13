import { FormikErrors } from "formik";
import { CSSProperties, HTMLAttributes, ReactElement } from "react";

export interface CommonInputProps<T> extends HTMLAttributes<T> {
  placeholder?: string;
  className?: string;
  classNameError?: string;
  label?: string;
  id?: string;
  ref?: React.Ref<T>;
  style?: CSSProperties;
  error?: string | FormikErrors<string>;
  name?: string;
  type?:
    | "text"
    | "number"
    | "date"
    | "datetime-local"
    | "email"
    | "hidden"
    | "month"
    | "password"
    | "range"
    | "search"
    | "checkbox";
}

export interface InputProps extends CommonInputProps<HTMLInputElement> {
  onUncontrolledChange?: (value: string) => void;
  isError?: boolean;
  Icon?: ReactElement;
  classNameContainer?: string;
  classNameIcon?: string;
  onOpenChange: ((open: boolean) => void) | undefined;
}
export interface CheckboxProps extends CommonInputProps<HTMLButtonElement> {
  htmlForm?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface SelectSearchProps<T> extends CommonInputProps<HTMLDivElement> {
  options: T[];
  selectionKeys: string[];
  onSelectChange: (value: T) => void;
  onSearchChange?: (value: string) => void;
  fetchNextPage: any;
  placeholderSearch?: string;
  value: string;
  isSearchable?: boolean;
  isFetchingNextPage?: boolean;
  isFetching?: boolean;
  width?: number;
}
