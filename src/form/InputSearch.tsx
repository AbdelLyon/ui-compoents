import { debounce } from "@mui/material";
import { Input } from "../shared/ui/input";
import { Search } from "lucide-react";
import { CommonInputProps } from "./types";

export type FormInputSearchProps = CommonInputProps & {
  handleChange: (value: string) => void;
  value: string;
  type?: "search";
  classnameIcon?: string;
  id?: string;
};

export const InputSearch = ({
  classname,
  placeholder,
  value,
  disabled = false,
  name,
  classnameIcon,
  type = "search",
  label,
  id,
  handleChange,
}: FormInputSearchProps) => {
  const debouncedHandleChange = debounce(
    (e) => handleChange(e.target.value),
    500
  );
  return (
    <div className="mb-6">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="relative flex items-center">
        <Input
          type={type}
          placeholder={placeholder}
          className={classname}
          onChange={debouncedHandleChange}
          name={name}
          disabled={disabled}
        />
        {!value && (
          <Search
            size={13}
            className={`text-muted-foreground right-3 ${classnameIcon} absolute`}
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
        )}
      </div>
    </div>
  );
};
