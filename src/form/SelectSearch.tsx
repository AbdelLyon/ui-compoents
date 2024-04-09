import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../shared/ui/popover";
import { Button } from "../shared/ui/button";
import { cn } from "../shared/lib/utils";
import { Command, CommandGroup, CommandItem } from "../shared/ui/command";
import { RenderLoader } from "../shared/ui/LoadingIndicator";
import { InputSearch } from "./InputSearch";

type DataType = {
  id?: string;
  title: string;
  body: string;
};

type Props<T extends DataType> = {
  placeholder: string;
  field: string;
  value?: string;
  setFieldValue: any;
  data?: T[];
  handleChange: (value: string) => void;
  isFetching?: boolean;
  isFetchingNextPage?: boolean;
  placeholderSearch?: string;
  fetchNextPage?: Function;
  isSearchable?: boolean;
  classNamePopoverContent?: string;
  className?: string;
  label?: string;
  error?: string;
  isError?: boolean;
  nameSearch?: string;
};

const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
  return (
    isLoading && (
      <div className="fixed top-1 left-0 bottom-0 h-full w-full flex justify-center items-center backdrop-blur-[2px]">
        <RenderLoader className="fixed bottom-2 flex justify-center text-primary text-center right-0 w-full z-10" />
      </div>
    )
  );
};

const ErrorMessage = ({ isError, error }: { isError: any; error: any }) => {
  return isError && <p className="text-red-600/80 mt-1 text-[12px]">{error}</p>;
};

const SelectItem = ({
  item,
  isSelected,
  onSelect,
}: {
  item: DataType;
  isSelected: boolean;
  onSelect: (value: string) => void;
}) => {
  return (
    <CommandItem
      className="flex justify-between"
      value={item.id}
      onSelect={(currentValue) => {
        onSelect(currentValue !== item.id ? currentValue : "");
      }}
    >
      {item.title}
      <Check
        className={cn("mr-2 h-4 w-4", {
          "opacity-100 text-green-600": isSelected,
          "opacity-0": !isSelected,
        })}
      />
    </CommandItem>
  );
};

const SelectSearch = <T extends DataType>({
  placeholder,
  setFieldValue,
  field,
  value,
  data,
  handleChange,
  isFetchingNextPage,
  isFetching,
  placeholderSearch,
  classNamePopoverContent,
  isSearchable = true,
  className,
  label,
  nameSearch,
  error,
  isError,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const valueSelected = data?.find((item) => item.id === value);
  const isLoading = isFetchingNextPage || isFetching;

  const getValue = () => {
    if (!value) return placeholder;
    const { title } = valueSelected ?? {};
    return title;
  };

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          handleChange("");
        }
      }}
    >
      {label && <label htmlFor="">{label}</label>}

      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border border-border text-text bg-transparent",
            { "text-muted-foreground": value === "" },
            className
          )}
        >
          <div className="truncate">{getValue()}</div>
          <ChevronsUpDown className="ml-2 h-[12px] w-[12px] shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("max-w-[300px] mt-1 p-3", classNamePopoverContent)}
      >
        <Command>
          {isSearchable && (
            <InputSearch
              classname="h-9 mb-2"
              placeholder={placeholderSearch}
              name={nameSearch}
              handleChange={handleChange}
              value=""
            />
          )}

          <CommandGroup className="max-h-[300px] overflow-y-auto">
            <CommandItem
              className="text-sm mb-1"
              value={placeholder}
              onSelect={() => {
                if (setFieldValue) {
                  setFieldValue(field, "");
                }
                setOpen(false);
              }}
            >
              {placeholder}
            </CommandItem>
            {data?.map((item) => (
              <SelectItem
                key={item.id}
                item={item}
                isSelected={value === item.id}
                onSelect={(currentValue) => {
                  if (setFieldValue) {
                    setFieldValue(
                      field,
                      currentValue !== placeholder ? currentValue : ""
                    );
                  }
                  setOpen(false);
                }}
              />
            ))}
          </CommandGroup>
        </Command>
        <LoadingOverlay isLoading={isLoading as boolean} />
      </PopoverContent>
      <ErrorMessage isError={isError} error={error} />
    </Popover>
  );
};

export default SelectSearch;
