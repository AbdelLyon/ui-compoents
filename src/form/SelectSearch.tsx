import { useEffect, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "../shared/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { RenderLoader } from "../shared/ui/LoadingIndicator";
import { ExtendedProps, SelectSearchProps } from "./types";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import InputCustom from "./InputCustom";
const SelectSearch = <T extends ExtendedProps>({
  options,
  onSelectChange,
  placeholder,
  error,
  className,
  classNameError,
  selectionKeys,
  onSearchChange,
  fetchNextPage,
  value,
  label,
  isSearchable,
  isFetchingNextPage,
  width,
  ...props
}: SelectSearchProps<T>) => {
  const valueSelected = options?.find((item) => item?.id === value);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  const handleSelectChange = useCallback(
    (item: T) => {
      onSelectChange?.(item);
    },
    [onSelectChange]
  );

  return (
    <Popover {...props}>
      {label && (
        <label style={{ width }} className="text-start">
          {label}
        </label>
      )}

      <PopoverTrigger asChild>
        <div
          className={cn(
            "w-[400px] flex justify-between items-center px-3 h-11 border border-border text-text bg-transparent rounded-md cursor-pointer",
            { "text-muted-foreground": value === "" },
            className
          )}
          style={{
            width,
          }}
        >
          <p className="truncate text-sm">
            {value
              ? selectionKeys.map((s) => `${valueSelected?.[s]} `)
              : placeholder}
          </p>
          <ChevronsUpDown className="right-4 h-[12px] w-[12px] shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[400px] mt-1 p-3")}
        style={{
          width,
        }}
      >
        <Command>
          {isSearchable && (
            <InputCustom
              name="search"
              className={`${error && "border-red-600/50"}`}
              handelChange={handleSearchChange}
              placeholder="Rechercher..."
              classNameError="text-[12px] text-red-600/70"
              type="search"
            />
          )}

          <CommandGroup>
            <CommandList className="pr-4">
              <CommandItem
                className="text-sm mb-1 py-2"
                value={placeholder}
                onSelect={(currentValue) => {
                  const newValue = options?.find(
                    (item) => item?.id === currentValue
                  );
                  if (newValue) {
                    handleSelectChange(newValue);
                  }
                }}
              >
                {placeholder}
              </CommandItem>
              {options?.map((item, index) => (
                <CommandItem
                  key={item?.id}
                  ref={options.length === index + 1 ? ref : null}
                  className="flex justify-between py-2
                  "
                  value={item?.id}
                  onSelect={(currentValue) => {
                    const newValue = options?.find(
                      (item) => item?.id === currentValue
                    );
                    if (newValue) {
                      handleSelectChange(item);
                    }
                  }}
                >
                  <p className="truncate">
                    {...selectionKeys.map((s) => `${item?.[s]} `)}
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
          </CommandGroup>
        </Command>
        {isFetchingNextPage && (
          <div className="fixed top-1 left-0 bottom-0 h-full w-full flex justify-center items-center backdrop-blur-[2px] ">
            <RenderLoader className="fixed bottom-2 flex justify-center text-primary text-center right-0 w-full z-10" />
          </div>
        )}
      </PopoverContent>
      {error && (
        <p className={cn("text-red-600/80 mt-1 text-[12px]", classNameError)}>
          {error}
        </p>
      )}
    </Popover>
  );
};

export default memo(SelectSearch);
