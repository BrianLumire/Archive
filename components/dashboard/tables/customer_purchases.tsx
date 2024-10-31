import { ColumnDef, Table } from "@tanstack/react-table";
import { IPurchasesMockData, purchases_mock_data } from "../data";
import { FieldFilter } from "./shared";
import { Table_Wrapper } from "./table_wrapper";
import { useGetCustomerPurchases } from "@/hooks/api/useCustomers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearch } from "@/hooks/helpers/useTableSearch";
import { ICustomerPurchases } from "@/lib/types/data.types";
import { urlBuilder } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const CustomerPurchases = () => {
  const { customer: id } = useParams<{ customer: string }>();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [queryParams, setQueryParams] = useState({
    owner: id,
    page: 1,
    search: "",
  });
  const { data, isLoading } = useGetCustomerPurchases(queryParams);
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
        searchField="product"
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
const columns: ColumnDef<ICustomerPurchases>[] = [
  {
    accessorKey: "product",
    header: "Item Name",
    cell: (info) => {
      return (
        <div className="fx--c gap-1">
          <img
            src={urlBuilder(info?.row.original?.product?.thumbnail || "")}
            alt={info.row.original?.product?.title}
            width="50"
            className="rounded-md max-h-[50px] object-cover"
          />
          <span>{info.row.original?.product?.title}</span>
        </div>
      );
    },
    accessorFn: (data) => data.product?.title,
  },
  {
    accessorKey: "product",
    header: "Media Type",
    cell: (info) => info.row.original.product?.product_type?.name,
  },
  {
    accessorKey: "creation_time",
    header: "Purchased On",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(), // Formatting date
  },
];
