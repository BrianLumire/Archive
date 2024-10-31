import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Table_Wrapper } from "../table_wrapper";
import { FieldFilter } from "../shared";
import { IoSettingsOutline } from "react-icons/io5";
import { AddVideo } from "../../modals/add_video";
import {
  useDeleteProduct,
  useGetProducts,
  useGetProductType,
  useGetProductTypes,
} from "@/hooks/api/useProducts";
import { IProduct, IProductQueryParams } from "@/lib/types/data.types";
import { baseUrl } from "@/lib/api";
import { urlBuilder } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewVideo } from "../../modals";
import { useCustomLoader } from "../../shared";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/helpers/useTableSearch";
import { MultiSelect } from "@/components/ui-extended/multi-select";
import SingleSelect from "@/components/ui-extended/single_select";

const VideosTable = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [queryParams, setQueryParams] = useState<IProductQueryParams>({
    product_type: "1",
    page: 1,
    search: "",
  });
  const { data: product_type } = useGetProductType(1);
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

  // const handleFilterChange = (field: string, value: string[] | undefined) => {
  //   setQueryParams((prev) => ({
  //     ...prev,
  //     [field]: value,
  //     page: 1,
  //   }));
  //   setPagination((prev) => ({ ...prev, pageIndex: 0 }));

  //   // Update active filters
  //   setActiveFilters((prev) => {
  //     if (value && value.length > 0) {
  //       return { ...prev, [field]: value };
  //     } else {
  //       const { [field]: _, ...rest } = prev;
  //       return rest;
  //     }
  //   });
  // };
  //handleFilterChange useEffect
  useEffect(() => {
    const categoryId = product_type?.categories.find(
      (cat) => cat.id.toString() === category
    )?.id;

    if (category && categoryId) {
      setQueryParams((prev) => ({
        ...prev,
        category: categoryId.toString(),
        page: 1,
      }));

      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    } else {
      setQueryParams((prev) => {
        const { category, ...rest } = prev;
        return rest;
      });
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [category]);
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    }));
  }, [pagination]);
  return (
    <div className="bg-card fx-col gap-1">
      <div className="fx-btw-c py-3 border-b rpx">
        <h1 className="dts4 font-semibold">Manage Videos</h1>
        <AddVideo />
      </div>
      <div className="rpx w-full fx-btw-c gap-4 p-4">
        <Input
          placeholder="Search.."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:max-w-sm"
        />
        <SingleSelect
          options={
            product_type?.categories.map((category) => ({
              value: category.id.toString(),
              label: category.name,
            })) || []
          }
          value={category}
          onChange={(value) => setCategory(value)}
          triggerLabel="Select Category"
          placeholder="Category"
        />
      </div>

      <Table_Wrapper
        columns={columns}
        loading={isLoading}
        data={data?.results || []}
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

export { VideosTable };

const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "title",
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
    accessorFn: (data) => data.title,
  },

  {
    accessorKey: "author",
    header: "Author",
  },
  //categories
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return <span>{category?.name}</span>;
    },
    accessorFn: (data) => data.category?.name,
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
  //actions
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
                <ViewVideo video={info.row.original} />
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
                Delete Video
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
