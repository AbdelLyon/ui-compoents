import { useEffect, memo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "../shared/lib/utils";
import { RenderLoader } from "../shared/ui/LoadingIndicator";
import { SelectProps } from "./types";
import { Popover, PopoverContent } from "@/shared/ui/popover";
import { SearchOption, Select, Trigger } from "./fragments/Select";

const SelectSearch = ({
  onSelectChange,
  options = [],
  label,
  placeholder,
  isSearchable,
  width = "100%",
  value,
  error,
  isFetchingNextPage,
  fetchNextPage,
  onSearchChange,
  placeholderSearch,
  selectionKeys = [],
  className,
  classNameError,
}: SelectProps) => {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {label && (
        <label style={{ width }} className="text-start">
          {label}
        </label>
      )}
      <Trigger
        options={options}
        selectionKeys={selectionKeys}
        value={value}
        className={className}
        placeholder={placeholder}
        width={width}
      />
      <PopoverContent className={cn("mt-1 p-3")} style={{ width }}>
        {isSearchable && (
          <SearchOption
            error={error}
            onSearchChange={onSearchChange}
            placeholderSearch={placeholderSearch}
          />
        )}

        <Select
          onSelectChange={onSelectChange}
          options={options}
          observerRef={ref}
          selectionKeys={selectionKeys}
          setOpen={setOpen}
          value={value}
          placeholder={placeholder}
        />
        {isFetchingNextPage && (
          <div className="fixed top-1 left-0 bottom-0 h-full w-full flex justify-center items-center backdrop-blur-[2px]">
            <RenderLoader className="fixed bottom-2 flex justify-center text-primary text-center right-0 w-full z-10" />
          </div>
        )}
      </PopoverContent>
      {error && (
        <p
          className={cn(
            "text-red-600/80 mt-1 text-[12px] text-start",
            classNameError
          )}
          style={{ width }}
        >
          {error}
        </p>
      )}
    </Popover>
  );
};

export default memo(SelectSearch);
