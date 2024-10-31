"use client";
import { ColumnDef, Table } from "@tanstack/react-table";
import { ReferralMockData, referrals_mock_data } from "../../data";
import { FieldFilter } from "../shared";
import { Table_Wrapper } from "../table_wrapper";
import { useParams, usePathname } from "next/navigation";
import { IAgent, IExtendedUserAgent, IUser } from "@/lib/types/data.types";
import { useGetAgentReferrals } from "@/hooks/api/useAgents";
import React from "react";
import { usePaginationAndSearch } from "@/hooks/helpers/usePaginationAndSearch";
import { Input } from "@/components/ui/input";
export const AgentReferral: React.FC<{ agent: IAgent }> = ({ agent }) => {
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

  const { data, isPending } = useGetAgentReferrals(queryParams);

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
        loading={isPending}
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

const columns: ColumnDef<IExtendedUserAgent>[] = [
  {
    accessorKey: "phone_number",
    header: "Phone",
  },

  {
    accessorKey: "referredOn",
    header: "Referred On",
    cell: ({ row }) =>
      new Date(row.original.creation_time).toLocaleDateString(),
  },
  {
    accessorKey: "total_purchases",
    header: "Total Purchases",
  },
];
