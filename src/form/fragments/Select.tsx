import { memo, useCallback } from "react";
import { ExtendedProps, SelectProps } from "../types";
import { Command, CommandItem, CommandList } from "../../shared/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../shared/lib/utils";
import InputCustom from "../InputCustom";
import { PopoverTrigger } from "../../shared/ui/popover";

const Trigger = ({
  width = "400px",
  className,
  value,
  selectionKeys = [],
  placeholder,
  options = [],
}: Partial<SelectProps<ExtendedProps>>) => {
  const valueSelected = options?.find((item) => item?.id === value) ?? {};

  return (
    <PopoverTrigger asChild>
      <div
        className={cn(
          "w-[400px] flex justify-between items-center px-3 h-11 border border-border bg-transparent rounded-md cursor-pointer",
          className
        )}
        style={{
          width,
        }}
      >
        <p
          className={cn("truncate text-[13px] ", {
            "text-muted-foreground opacity-50": !value,
          })}
        >
          {value
            ? selectionKeys?.map((s) => `${valueSelected?.[s]} `)
            : placeholder}
        </p>
        <ChevronsUpDown className="right-4 h-[12px] w-[12px] shrink-0 opacity-50" />
      </div>
    </PopoverTrigger>
  );
};

const SearchOption = memo(
  ({
    error = "",
    onSearchChange,
    placeholderSearch = "",
  }: Partial<SelectProps<any>>) => {
    const handleSearchChange = useCallback(
      (value: string) => onSearchChange?.(value),
      [onSearchChange]
    );

    return (
      <InputCustom
        name="search"
        className={`${error && "border-red-600/50"}`}
        handelChange={handleSearchChange}
        placeholder={placeholderSearch}
        classNameError="text-[12px] text-red-600/70"
        type="search"
      />
    );
  }
);

const Select = memo(
  ({
    placeholder = "",
    options = [],
    onSelectChange,
    value = "",
    setOpen,
    selectionKeys = [],
    observerRef,
  }: SelectProps<ExtendedProps>) => {
    const handleSelectChange = useCallback(
      (currentValue: string) => {
        const newValue = options?.find((item) => {
          return item?.id === currentValue;
        });
        if (newValue && newValue.id !== value) {
          onSelectChange(newValue);
        } else {
          onSelectChange({ id: "" });
        }
        setOpen?.(false);
      },
      [onSelectChange, options, value]
    );

    return (
      <Command>
        <CommandList className="pr-4">
          <CommandItem
            className="text-sm mb-1 py-2"
            value={placeholder}
            onSelect={handleSelectChange}
          >
            {placeholder}
          </CommandItem>
          {options?.map((item, index) => (
            <CommandItem
              key={item?.id}
              ref={options.length === index + 1 ? observerRef : null}
              className="flex justify-between py-2"
              value={item?.id}
              onSelect={handleSelectChange}
            >
              <p className="truncate">
                {selectionKeys.map((s) => `${item?.[s]} `)}
              </p>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === item?.id
                    ? "opacity-100 text-green-600"
                    : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    );
  }
);

export { Trigger, SearchOption, Select };
