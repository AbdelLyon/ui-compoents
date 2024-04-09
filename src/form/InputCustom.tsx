import { Input } from "../shared/ui/input";
import { debounce } from "@mui/material";
import { InputProps } from "./types";
import { cn } from "../shared/lib/utils";

export const InputCustom = ({
  type,
  placeholder,
  label,
  name,
  error,
  handleChange,
  isError,
  Icon,
  disabled = false,
  classnameContainer,
  classname,
}: InputProps): JSX.Element => {
  const debouncedHandleChange = debounce(
    (e) => handleChange && handleChange(e.target.value),
    500
  );

  return (
    <div className={cn("mb-2", classnameContainer)}>
      {label && <label>{label}</label>}
      <div className="relative">
        <Input
          required
          className={classname}
          disabled={disabled}
          type={type}
          name={name}
          onChange={debouncedHandleChange}
          placeholder={placeholder}
        />
        {Icon && (
          <div
            className="text-muted-foreground right-3 absolute"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {Icon}
          </div>
        )}
      </div>
      {isError && (
        <p className="text-red-600/80 mt-1 text-[14px]">{error as string}</p>
      )}
    </div>
  );
};
