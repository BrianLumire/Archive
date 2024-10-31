import { agentReferrals } from "../../data";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table_Wrapper } from "../table_wrapper";
import { useGetAgentEarnings } from "@/hooks/api/useFinances";
import {
  IAgent,
  IAgentEarningQueryParams,
  IAgentEarnings,
  IAgentResponse,
} from "@/lib/types/data.types";
import { usePaginationAndSearch } from "@/hooks/helpers/usePaginationAndSearch";
import { Input } from "@/components/ui/input";
import MonthFilter, { YearFilter } from "./date_filter";
type AgentEarningsProps = (typeof agentReferrals)[number];
const AgentEarnings = () => {
  const [month, setMonth] = React.useState<string | null>(null);
  const [year, setYear] = React.useState<string | null>(null);
  const [queryParams, setQueryParams] =
    React.useState<IAgentEarningQueryParams>({
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

  const { data, isLoading } = useGetAgentEarnings(queryParams);
  return (
    <div>
      <div className="rpx w-full fx-btw py-4">
        <Input
          placeholder="Search.."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:max-w-sm"
        />
        {/* <div className="fx--c gap-2 hidden">
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
        </div> */}
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
const columns: ColumnDef<IAgentEarnings>[] = [
  {
    accessorKey: "full_name",
    header: "Agent Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "total_referrals",
    header: "Total Referrals",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "referree_purchases",
    header: "Referee Purchases",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "commision_total",
    header: "Commission Earned",
    cell: (info) => `Ksh ${info.getValue()}`,
  },
  {
    accessorKey: "disbursed_commission",
    header: "Total Disbursed Amount",
    cell: (info) => `Ksh ${info.getValue()}`,
  },
  {
    accessorKey: "current_balance",
    header: "Current Balance",
    cell: (info) => `Ksh ${info.getValue()}`,
  },
];
export { AgentEarnings };
