"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { customers_mock_data, ICustomerMockData } from "../data";
import { Table_Wrapper } from "./table_wrapper";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useGetAllCustomers, useGetCustomers } from "@/hooks/api/useCustomers";
import { IUser } from "@/lib/types/data.types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import View_Customer_Stats_Model from "../modals/view_customer_stats_modal";
import Link from "next/link";
import { usePaginationAndSearch } from "@/hooks/helpers/usePaginationAndSearch";
import { Input } from "@/components/ui/input";

const CustomersOnPlatform = () => {
  const router = useRouter();
  const [queryParams, setQueryParams] = React.useState({
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
  const { data, isLoading } = useGetAllCustomers(queryParams);

  return (
    <div className="bg-card rounded-lg">
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
const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "phone_number",
    header: "Phone",
  },

  {
    accessorKey: "referral_code",
    header: "Referral Code",
  },
  {
    accessorKey: "total_purchases",
    header: "Total Purchases",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (info) => {
      return (
        <div className="fx--c gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoSettingsOutline size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <View_Customer_Stats_Model />
              </DropdownMenuItem> */}
              <DropdownMenuItem className="cursor-pointer">
                <Link href={`/admin/customers/${info.row.original.id}`}>
                  {" "}
                  View Customer Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
export { CustomersOnPlatform };
