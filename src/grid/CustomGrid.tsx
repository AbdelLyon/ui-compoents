import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import {
  DataGridPro,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid-pro";
import { useTheme } from "next-themes";
import { cn } from "../shared/lib/utils";

interface CustomGridProps<T extends GridValidRowModel> {
  data: T[];
  isLoading?: boolean;
  isFetchingNextPage: boolean;
  columns: GridColDef<T>[];
  isFetching?: boolean;
  isClickableCell?: boolean;
  checkboxSelection?: boolean;
  borderRow?: boolean;
  themeColor?: {
    light: string;
    dark: string;
  };
  fetchNextPage?: () => any;
}

const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "hsl(211, 100%, 58%, 0.825)",
      },
      secondary: {
        main: "#445565",
      },
    },
  });

const CustomGrid = <T extends GridValidRowModel>({
  data = [],
  isLoading,
  isFetchingNextPage,
  columns,
  fetchNextPage,
  isFetching,
  isClickableCell,
  checkboxSelection = false,
  borderRow = false,
  themeColor,
}: CustomGridProps<T>) => {
  const { theme } = useTheme();

  return (
    <div className="border-border h-[577px] rounded-t-md border">
      <ThemeProvider theme={getTheme(theme as PaletteMode)}>
        <DataGridPro
          rows={data}
          columns={columns}
          paginationMode="server"
          sortingMode="server"
          checkboxSelection={checkboxSelection}
          loading={isLoading || isFetchingNextPage || isFetching}
          className={` ${theme === "light" && "bg-white"} ${
            !themeColor && "dark:bg-background bg-white text-sm"
          }`}
          onRowsScrollEnd={() => {
            if (data.length >= 10 && fetchNextPage) {
              fetchNextPage();
            }
          }}
          hideFooter
          disableRowSelectionOnClick
          sx={{
            border: "none",
            fontSize: "13px !important",
            fontFamily: "inherit",
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              overflowY: "auto",
            },
            ".MuiDataGrid-row": {
              borderTop: borderRow ? "1px solid hsl(var(--border))" : "",
              color: "hsl(var(--text))",
              cursor: isClickableCell ? "pointer" : "",
            },
            ".Mui-selected": {
              backgroundColor: "hsl(var(--backgound)) !important",
            },
            ".MuiDataGrid-row:hover": {
              backgroundColor: cn({
                "hsl(var(--card)) !important": !themeColor,
                [`hsl(${themeColor?.light}, 20%) !important`]:
                  theme === "light",
                [`hsl(${themeColor?.dark}, 20%) !important`]: theme === "dark",
              }),
            },
            ".MuiDataGrid-cell": {
              border: "none",
            },
            ".MuiDataGrid-cell:focus-within, .MuiDataGrid-cell:focus": {
              outline: "none !important",
            },
            ".MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-columnHeader":
              {
                outline: "none !important",
                opacity: ".7 !important",
              },
            ".MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "none !important",
            },
            ".columnHeaderTitleContainer": {
              border: "none",
            },
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".css-1essi2g-MuiDataGrid-columnHeaderRow": {
              backgroundColor: cn({
                "#fff !important": !themeColor,
                [`hsl(${themeColor?.light}) !important`]: theme === "light",
                [`hsl(${themeColor?.dark}) !important`]: theme === "dark",
              }),
              color: "hsl(var(--text))",
              borderBottom: "1px solid hsl(var(--border))",
            },
            ".css-jmgi9p::after ": {
              backgroundColor: "hsl(var(--border)) !important",
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomGrid;
