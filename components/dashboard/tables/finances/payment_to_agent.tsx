import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { paymentToAgents } from "../../data";
import { Table_Wrapper } from "../table_wrapper";
import { useGetPaymentToAgents } from "@/hooks/api/useFinances";
import {
  IPaymentToAgent,
  IPaymentToAgentQueryParams,
} from "@/lib/types/data.types";
import { usePaginationAndSearch } from "@/hooks/helpers/usePaginationAndSearch";
import { Input } from "@/components/ui/input";
import MonthFilter, { YearFilter } from "./date_filter";

type PaymentToAgentProps = (typeof paymentToAgents)[number];
const PaymentToAgent = () => {
  const [month, setMonth] = React.useState<string | null>(null);
  const [year, setYear] = React.useState<string | null>(null);
  const [queryParams, setQueryParams] =
    React.useState<IPaymentToAgentQueryParams>({
      page: 1,
      page_size: 10,
      search: "",
    });

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

  const { data, isLoading } = useGetPaymentToAgents(queryParams);

  return (
    <div>
      <div className="rpx w-full fx-btw  py-4 ">
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
const columns: ColumnDef<IPaymentToAgent>[] = [
  {
    accessorKey: "agent_paid",
    header: "Agent Name",
    cell: ({ row }) => row.original?.agent_paid?.full_name,
    accessorFn: (row) => row?.agent_paid?.full_name,
  },
  {
    accessorKey: "total",
    header: "Payout Amount (Ksh)",
    cell: (info) => `Ksh ${info.getValue()}`, // Formatting cell to display Ksh
  },
  {
    accessorKey: "agent_current_balance",
    header: "Balance (Ksh)",
    cell: (info) => `Ksh ${info.getValue()}`, // Formatting cell to display Ksh
  },
  {
    accessorKey: "creation_time",
    header: "Date",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(), // Formatting date
    footer: "Date", // Static footer label
  },
];
export { PaymentToAgent };
