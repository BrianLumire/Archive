import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data_table_filters";

interface DataTableToolbarProps<TData, TValue> {
  table: Table<TData>;
  filterField: keyof TData;
  title: string;
  user_options?: { label: string; value: string }[];
  onFilterChange?: (field: string, value: string[] | undefined) => void;
}

export function FieldFilter<TData, TValue>({
  table,
  filterField,
  title,
  user_options,
  onFilterChange,
}: DataTableToolbarProps<TData, TValue>) {
  const field: string = filterField as string;

  const data = table.getColumn(field)?.getFacetedUniqueValues();

  let options: { label: string; value: string }[] = [];
  for (let [key, value] of data || []) {
    options.push({ label: key, value: key });
  }
  //filter options with null values
  options = options.filter((option) => option.value);

  return (
    table.getColumn(field) && (
      <DataTableFacetedFilter
        column={table.getColumn(field)}
        title={title}
        options={user_options ?? options}
        onFilterChange={(value: string[] | undefined) => {
          onFilterChange && onFilterChange(field, value);
        }}
      />
    )
  );
}
