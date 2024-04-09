import { FormikErrors } from "formik";
import { ReactElement } from "react";

export type CommonInputProps = {
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  classname?: string;
  label?: string;
};

export interface InputProps extends CommonInputProps {
  type:
    | "text"
    | "number"
    | "button"
    | "date"
    | "datetime-local"
    | "email"
    | "hidden"
    | "month"
    | "password"
    | "range"
    | "reset";
  error?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  handleChange?: (value: string) => void;
  isError?: boolean;
  Icon?: ReactElement;
  classnameContainer?: string;
}
