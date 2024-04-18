import { Input } from "../shared/ui/input";
import { debounce } from "@mui/material";
import { InputProps } from "./types";
import { cn } from "../shared/lib/utils";
import {
  HTMLAttributes,
  useRef,
  useState,
  useCallback,
  useEffect,
  memo,
} from "react";
import { Eye, EyeOff, Search } from "lucide-react";

const InputCustom = ({
  type = "text",
  classNameContainer,
  label,
  classNameError,
  classNameIcon,
  handelChange,
  Icon,
  error,
  value,
  placeholder,
  className,
  classNameLabel,
  width = "100%",
}: InputProps & HTMLAttributes<HTMLInputElement>) => {
  const [searchValue, setSearchValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const debouncedHandleChange = useCallback(
    debounce((e) => {
      handelChange?.(e.target.value);
      if (type === "search") {
        setSearchValue(e.target.value);
      }
    }, 500),
    [type, handelChange]
  );

  useEffect(() => {
    if (ref.current && value !== undefined) {
      ref.current.value = value;
    }
  }, [value]);

  return (
    <div className="mb-3">
      {label && (
        <label className={cn("text-sm", classNameLabel)}>{label}</label>
      )}
      <div
        className={cn("relative mt-1", classNameContainer)}
        style={{ width }}
      >
        <Input
          onChange={(e) => debouncedHandleChange(e)}
          type={isPasswordVisible ? "text" : type}
          ref={ref}
          placeholder={placeholder}
          className={cn("text-sm", className)}
          id="input"
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
            {isPasswordVisible ? (
              <EyeOff
                id="eye-icon"
                className={`text-muted-foreground right-3 ${classNameIcon} absolute`}
                style={{ top: "50%", transform: "translateY(-50%)" }}
                size={16}
                onClick={() => {
                  setIsPasswordVisible(false);
                }}
              />
            ) : (
              <Eye
                className={`text-muted-foreground right-3 ${classNameIcon} absolute`}
                style={{ top: "50%", transform: "translateY(-50%)" }}
                size={16}
                onClick={() => {
                  setIsPasswordVisible(true);
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
        <p className={cn("text-red-600 mt-1 ", classNameError)}>{error}</p>
      )}
    </div>
  );
};

export default memo(InputCustom);
