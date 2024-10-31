import React from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { FieldFilter } from "../shared";
import { Table_Wrapper } from "../table_wrapper";
import { commission_earning_mock_data } from "../../data";
import { IAgent, IAgentCommission } from "@/lib/types/data.types";
import { useGetAgentCommission } from "@/hooks/api/useAgents";
import { usePaginationAndSearch } from "@/hooks/helpers/usePaginationAndSearch";
import { Input } from "@/components/ui/input";

export const ComissionEarned = ({ agent }: { agent: IAgent }) => {
  const [queryParams, setQueryParams] = React.useState({
    page: 1,
    page_size: 10,
    search: "",
    agent: agent.agent_code || undefined,
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
        agent: agent.agent_code || undefined,
      });
    },
  });
  const { data, isLoading } = useGetAgentCommission(queryParams);

  return (
    <div>
      <div className="rpx w-full flex flex-col  py-4">
        <Input
          placeholder="Search.."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:max-w-sm"
        />
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

const columns: ColumnDef<IAgentCommission>[] = [
  {
    accessorKey: "channel",
    header: "Media",
    cell: ({ row }) => <div className="capitalize">{row.original.channel}</div>,
  },
  {
    accessorKey: "product",
    header: "Item",
    cell: ({ row }) => row.original.product.title,
  },
  {
    accessorKey: "soldOn",
    header: "Sold On",
    cell: ({ row }) =>
      new Date(row.original.creation_time).toLocaleDateString(), // Formatting date
  },
  {
    accessorKey: "commission",
    header: "Commission",
    cell: ({ row }) => `Ksh ${row.original.commision_total.toFixed(2)}`, // Formatting commission as currency
  },
];
