import { Input } from "../shared/ui/input";
import { debounce } from "@mui/material";
import { InputProps } from "./types";
import { cn } from "../shared/lib/utils";
import { useState } from "react";
import { Eye, EyeOff, Search } from "lucide-react";

export const InputCustom = (props: InputProps) => {
  const {
    type,
    classNameContainer,
    label,
    classNameError,
    classNameIcon,
    onChange,
    Icon,
    error,
    ...rest
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const [showIconPassword, setShowIconPassword] = useState(false);

  const debouncedHandleChange = debounce((e) => {
    onChange?.(e.target.value);
    if (type === "search") {
      setSearchValue(e.target.value);
    }
  }, 500);

  return (
    <div className={cn("mb-2", classNameContainer)}>
      {label && <label>{label}</label>}
      <div className="relative">
        <Input
          {...rest}
          onChange={(e) => debouncedHandleChange(e)}
          autoComplete="off"
        />
        {Icon && (
          <div
            className="text-muted-foreground right-3 absolute"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {Icon}
          </div>
        )}
        {type === "password" && (
          <>
            {showIconPassword ? (
              <EyeOff
                className={`text-muted-foreground right-3 ${classNameIcon} absolute`}
                style={{ top: "50%", transform: "translateY(-50%)" }}
                size={16}
                onClick={() => {
                  setShowIconPassword(false);
                }}
              />
            ) : (
              <Eye
                className={`text-muted-foreground right-3 ${classNameIcon} absolute`}
                style={{ top: "50%", transform: "translateY(-50%)" }}
                size={16}
                onClick={() => {
                  setShowIconPassword(true);
                }}
              />
            )}
          </>
        )}
        {searchValue === "" && type === "search" && (
          <Search
            size={13}
            className={`text-muted-foreground right-3 ${classNameIcon} absolute`}
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
        )}
      </div>
      {error && (
        <p className={cn("text-red-600 mt-1", classNameError)}>{error}</p>
      )}
    </div>
  );
};
