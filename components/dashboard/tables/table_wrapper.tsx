"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  TableOptions,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronDown } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "./shared/data_table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  Filters?: React.FC<{
    table: TTable<TData>;
  }>;
  searchField?: keyof TData;
  hideToolbar?: boolean;
  onRowClick?: (row: TData) => void;
  columnVisibilitySelector?: boolean;
  tableOptions?: Partial<TableOptions<TData>>;
  customComponents?: {
    Toolbar?: React.FC<{ table: TTable<TData> }>;
    Header?: React.FC<{ table: TTable<TData> }>;
    Body?: React.FC<{ table: TTable<TData> }>;
    Pagination?: React.FC<{ table: TTable<TData> }>;
  };
  className?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const Table_Wrapper = <TData, TValue>({
  columns,
  data,
  loading,
  Filters,
  hideToolbar = false,
  onRowClick,
  columnVisibilitySelector = true,
  tableOptions = {},
  customComponents = {},
  className,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const defaultTableOptions: TableOptions<TData> = {
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  };

  const mergedTableOptions = { ...defaultTableOptions, ...tableOptions };
  const table = useReactTable(mergedTableOptions);

  const DefaultToolbar: React.FC<{ table: TTable<TData> }> = ({ table }) => {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
      <div className="rpx w-full flex justify-end gap-4 pb-4">
        {/* <Input
          placeholder="Search.."
          value={searchValue}
          onChange={(event) => {
            onSearchChange?.(event.target.value);
          }}
          className="w-full md:max-w-sm"
        /> */}
        <div className="hidden md:flex justify-between gap-2">
          {Filters && (
            <div className="flex gap-2 w-full mb:flex-col">
              <Filters table={table} />
              {isFiltered && (
                <Button
                  variant="ghost"
                  onClick={() => table.resetColumnFilters()}
                  className="h-8 px-2 lg:px-3"
                >
                  Reset
                  <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          {columnVisibilitySelector && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    );
  };

  const DefaultHeader: React.FC<{ table: TTable<TData> }> = ({ table }) => (
    <TableHeader className="bg-accent">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              style={{
                minWidth: `${header.getSize()}px`,
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );

  const DefaultBody: React.FC<{ table: TTable<TData> }> = ({ table }) => (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Loading...
          </TableCell>
        </TableRow>
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            onClick={() => onRowClick?.(row.original)}
            className="cursor-pointer"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  const {
    Toolbar = DefaultToolbar,
    Header = DefaultHeader,
    Body = DefaultBody,
    Pagination = DataTablePagination,
  } = customComponents;

  return (
    <div className={`bg-card ${className}`}>
      {!hideToolbar && <Toolbar table={table} />}
      <div className="border w-full">
        <Table>
          <Header table={table} />
          <Body table={table} />
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
};
