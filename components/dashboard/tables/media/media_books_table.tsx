"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Table_Wrapper } from "../table_wrapper";
import { books_mock_data, IBooksMockData } from "../../data";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { FieldFilter } from "../shared";
import { AddBook, ViewBook } from "../../modals";
import { useDeleteProduct, useGetProducts } from "@/hooks/api/useProducts";
import { IProduct, IProductQueryParams } from "@/lib/types/data.types";
import { base_url, baseUrl } from "@/lib/api";
import { useCustomLoader } from "../../shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoSettingsOutline } from "react-icons/io5";
import { urlBuilder } from "@/lib/utils";
import { useSearch } from "@/hooks/helpers/useTableSearch";
import { Input } from "@/components/ui/input";
const MediaBooksTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10,
  });
  const [queryParams, setQueryParams] = useState<IProductQueryParams>({
    product_type: "2",
    page: 1,
    search: "",
  });
  const { data, isLoading } = useGetProducts(queryParams);

  const { searchTerm, handleSearchChange } = useSearch({
    onSearch: (term: string) => {
      setQueryParams((prev) => ({
        ...prev,
        search: term,
        page: 1,
      }));
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    },
  });
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    }));
  }, [pagination.pageIndex, pagination.pageSize]);

  const Filters = ({ table }: { table: Table<IProduct> }) => {
    return (
      <>
        <FieldFilter table={table} filterField="author" title="Author" />
      </>
    );
  };
  return (
    <div className="bg-card">
      <div className="fx-btw-c py-3 border-b  rpx">
        <h1 className="dts4 font-semibold">Manage Books</h1>
        <AddBook />
      </div>
      <div className="rpx w-full fx-btw-c gap-4 py-4">
        <Input
          placeholder="Search.."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:max-w-sm"
        />
      </div>
      <Table_Wrapper
        hideToolbar
        loading={isLoading}
        columns={columns}
        data={data?.results || []}
        tableOptions={{
          pageCount: data ? Math.ceil(data.count / pagination.pageSize) : -1,
          manualPagination: true,
          onPaginationChange: setPagination,
          state: {
            pagination,
          },
        }}
      />
    </div>
  );
};

export { MediaBooksTable };
export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: (info) => {
      return (
        <div className="fx--c gap-1">
          <img
            src={urlBuilder(info?.row.original?.thumbnail || "")}
            alt={info.row.original.title}
            width="50"
            className="rounded-md max-h-[50px] object-cover"
          />
          <span>{info.row.original.title}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info) => `Ksh ${info.getValue() as number}`,
  },
  {
    accessorKey: "purchases_number",
    header: "Purchases",
  },
  {
    accessorKey: "last_updated_time",
    header: "Updated Date",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (info) => {
      const { mutateAsync } = useDeleteProduct();
      const { handlePromise, modalOpen, setModalOpen, loading } =
        useCustomLoader();
      return (
        <div className="fx--c gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoSettingsOutline size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <ViewBook book={info.row.original} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={async (e) => {
                  e.preventDefault();
                  handlePromise({
                    func: async () => {
                      await mutateAsync(info.row.original.id);
                    },
                  });
                }}
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" />}
                Delete Book
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
