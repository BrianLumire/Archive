import React from "react";
import { salesIncome } from "../../data";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "../table_wrapper";
import { useGetSalesIncome } from "@/hooks/api/useFinances";
import {
  ISalesIncome,
  ISalesInterfaceQueryParams,
} from "@/lib/types/data.types";
import { usePaginationAndSearch } from "@/hooks/helpers/usePaginationAndSearch";
import { Input } from "@/components/ui/input";
import MonthFilter, { YearFilter } from "./date_filter";

type SalesIncome = (typeof salesIncome)[number];
const Transaction_Sales_Income = () => {
  const [queryParams, setQueryParams] =
    React.useState<ISalesInterfaceQueryParams>({
      page: 1,
      page_size: 10,
      search: "",
    });
  const [month, setMonth] = React.useState<string | null>(null);
  const [year, setYear] = React.useState<string | null>(null);

  const {
    pagination,
    searchTerm,
    setPagination,
    handleSearchChange,
    handlePaginationChange,
  } = usePaginationAndSearch({
    onSearchAndPaginationChange: ({ pageIndex, pageSize, searchTerm }) => {
      setQueryParams({
        page: pageIndex + 1,
        page_size: pageSize,
        search: searchTerm,
      });
    },
  });
  React.useEffect(() => {
    if (month) {
      setQueryParams((prev) => ({
        ...prev,
        month: month,
      }));
    } else {
      setQueryParams((prev) => {
        const { month, ...rest } = prev;
        return rest;
      });
    }
  }, [month]);
  React.useEffect(() => {
    if (year) {
      setQueryParams((prev) => ({
        ...prev,
        year: year,
      }));
    } else {
      setQueryParams((prev) => {
        const { year, ...rest } = prev;
        return rest;
      });
    }
  }, [year]);

  const { data, isLoading } = useGetSalesIncome(queryParams);

  return (
    <div>
      <div className="rpx w-full  fx-btw  py-4">
        <Input
          placeholder="Search.."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:max-w-sm"
        />
        <div className="fx--c gap-2">
          <MonthFilter
            onChange={(value) => {
              setMonth(value);
            }}
            value={month}
            placeholder="Select Month"
            triggerLabel="Select Month"
          />
          <YearFilter
            onChange={(value) => {
              setYear(value);
            }}
            value={year}
            placeholder="Select Year"
            triggerLabel="Select Year"
          />
        </div>
      </div>
      <Table_Wrapper
        columns={columns}
        data={data ? data.results : []}
        columnVisibilitySelector={false}
        loading={isLoading}
        hideToolbar
        tableOptions={{
          pageCount: data ? Math.ceil(data.count / pagination.pageSize) : -1,
          manualPagination: true,
          manualFiltering: true,
          onPaginationChange: setPagination,
          state: {
            pagination,
          },
        }}
      />
    </div>
  );
};

const columns: ColumnDef<ISalesIncome>[] = [
  {
    accessorKey: "owner",
    header: "Phone Number",
    footer: (props) => props.column.id,
    cell: ({ row }) => row.original?.owner?.phone_number,
  },
  {
    accessorKey: "product",
    header: "Media Type",
    cell: ({ row }) => row.original?.product?.category?.name,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "product",
    header: "Item Name",
    cell: ({ row }) => row.original.product?.title,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "total",
    header: "Amount (Ksh)",
    cell: ({ row }) => `Ksh ${row.original.total}`,
    footer: (props) => `Total: `,
  },
  {
    accessorKey: "creation_time",
    header: "Date",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    footer: (props) => props.column.id,
  },
];
export { Transaction_Sales_Income };
