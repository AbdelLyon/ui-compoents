import { useTheme } from "next-themes";
import { cn } from "../shared/lib/utils";
import { Skeleton } from "../shared/ui/skeleton";

interface Props {
  checkboxSelection?: boolean;
  rows: number;
  borderRow?: boolean;
  columns?: number;
  themeColor?: {
    light: string;
    dark: string;
  };
}

const SkeletonRow: React.FC<Props> = ({
  checkboxSelection,
  rows,
  borderRow,
}) => {
  return (
    <div
      className={cn(
        "border-border flex h-[52px] items-center justify-between px-3",
        { ["border-b"]: borderRow }
      )}
    >
      <div className="flex">
        {checkboxSelection && (
          <div className="border-border mr-6 size-5 rounded-[3px] border py-1"></div>
        )}
      </div>
      <div className="flex w-full items-center gap-28">
        {[...Array(rows)].map((_, i: number) => (
          <div key={`skeleton-${i}`}>
            <Skeleton className="h-2 w-[150px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const SkeletonGrid: React.FC<Props> = ({
  columns = 10,
  rows = 4,
  checkboxSelection,
  borderRow,
  themeColor,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn("border-border rounded rounded-t-sm border border-b-0", {
        ["bg-white"]: theme === "light",
      })}
    >
      <div
        style={{
          backgroundColor: cn({
            [`hsl(${themeColor?.light})`]: theme === "light",
            [`hsl(${themeColor?.dark})`]: theme === "dark",
          }),
        }}
      >
        <SkeletonRow
          checkboxSelection={checkboxSelection}
          rows={rows}
          borderRow={borderRow}
          themeColor={themeColor}
        />
      </div>
      {[...Array(columns)].map((_, columnIndex) => (
        <div key={`skeleton-column-${columnIndex}`}>
          <SkeletonRow
            checkboxSelection={checkboxSelection}
            rows={rows}
            borderRow={borderRow}
          />
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
