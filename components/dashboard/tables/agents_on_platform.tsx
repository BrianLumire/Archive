import React, { useEffect, useState } from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { agents_mock_data, AgentsMockData } from "../data";
import { Table_Wrapper } from "./table_wrapper";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FieldFilter } from "./shared";
import { useGetAgents } from "@/hooks/api/useAgents";
import { IAgent } from "@/lib/types/data.types";
import { AddAgent } from "../modals/add_agent";
import { to2dp } from "../inputs";
import { PayAgent } from "../modals/pay_agent";
import { useSearch } from "@/hooks/helpers/useTableSearch";
import { Input } from "@/components/ui/input";
import { usePaginationAndSearch } from "@/hooks/helpers/usePaginationAndSearch";
import { useGetRegions } from "@/hooks/api/useRegions";
import SingleSelect from "@/components/ui-extended/single_select";

const AgentsOnPlatform = () => {
  const router = useRouter();
  const { data: regions } = useGetRegions();
  const [region, setRegion] = useState<string | null>(null);
  const [queryParams, setQueryParams] = React.useState<{
    page: number;
    page_size: number;
    search: string;
    region?: string;
  }>({
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
  const { data, isLoading } = useGetAgents(queryParams);
  useEffect(() => {
    if (!regions) return;
    const regionId = regions.find((cat) => cat.id.toString() === region)?.id;

    if (region && regionId) {
      setQueryParams((prev) => ({
        ...prev,
        region: regionId.toString(),
        page: 1,
      }));
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    } else {
      setQueryParams((prev) => {
        const { region, ...rest } = prev;
        return rest;
      });
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [region]);
  return (
    <div className="bg-card rounded-lg">
      <div className="fx-btw-c py-3 border-b  rpx">
        <h1 className="dts4 font-semibold">Mentors On Platform</h1>
        <AddAgent />
      </div>
      <div className="rpx w-full fx-btw-c  py-4">
        <Input
          placeholder="Search.."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:max-w-sm"
        />
        <SingleSelect
          options={
            regions?.map((region) => ({
              value: region.id.toString(),
              label: region.name,
            })) || []
          }
          value={region}
          onChange={(value) => setRegion(value)}
          triggerLabel="Select Region"
          placeholder="Region"
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
        onRowClick={(original) => {
          router.push(`/admin/agents/${original.id}`);
        }}
      />
    </div>
  );
};

export { AgentsOnPlatform };
const columns: ColumnDef<IAgent>[] = [
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ row }) => <div>{row?.original?.region?.name}</div>,
    accessorFn: (row) => row.region?.name,
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
  },
  {
    accessorKey: "total_referrals",
    header: "Total Referrals",
  },
  {
    accessorKey: "commision_total",
    header: "Commission Earned",
    size: 180,
    cell: ({ row }) => <div>{to2dp(row.original.commision_total || 0)}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <PayAgent agent={row.original} />
      </div>
    ),
  },
];
