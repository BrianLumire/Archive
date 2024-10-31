"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Table_Wrapper } from "../table_wrapper";
import { exams_mock_data, IExamsMockData } from "../../data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FieldFilter } from "../shared";
import { Exam_Material_Modal, ViewExamMaterial } from "../../modals";
import {
  useDeleteProduct,
  useGetProducts,
  useGetProductType,
} from "@/hooks/api/useProducts";
import { IProduct, IProductQueryParams } from "@/lib/types/data.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCustomLoader } from "../../shared";
import { Loader2 } from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";
import { useSearch } from "@/hooks/helpers/useTableSearch";
import { Input } from "@/components/ui/input";
import SingleSelect from "@/components/ui-extended/single_select";

const ExamMaterials = () => {
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [queryParams, setQueryParams] = useState<IProductQueryParams>({
    product_type: "3",
    page: 1,
    search: "",
  });
  const { data: product_type } = useGetProductType(3);
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

  useEffect(() => {
    const subCategoryId = product_type?.sub_categories.find(
      (cat) => cat.id.toString() === subCategory
    )?.id;

    if (subCategory && subCategoryId) {
      setQueryParams((prev) => ({
        ...prev,
        sub_category: subCategoryId.toString(),
        page: 1,
      }));

      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    } else {
      setQueryParams((prev) => {
        const { sub_category, ...rest } = prev;
        return rest;
      });
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [subCategory]);
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    }));
  }, [pagination]);
  return (
    <div className="bg-card">
      <div className="fx-btw-c py-3 border-b  rpx ">
        <h1 className="dts4 font-semibold">Manage Exam Material</h1>
        <Exam_Material_Modal />
      </div>
      <div className="rpx w-full fx-btw-c gap-4 p-2">
        <Input
          placeholder="Search.."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:max-w-sm"
        />
        <SingleSelect
          options={
            product_type?.sub_categories.map((subCategory) => ({
              value: subCategory.id.toString(),
              label: subCategory.name,
            })) || []
          }
          value={subCategory}
          onChange={(value) => setSubCategory(value)}
          triggerLabel="Select Form"
          placeholder="Form"
        />
      </div>
      <Table_Wrapper
        columns={columns}
        loading={isLoading}
        hideToolbar
        searchField="title"
        data={data?.results || []}
        onSearchChange={(value) => {}}
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

export { ExamMaterials };
const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "sub_category",
    header: "Form",
    accessorFn: (data) => data.sub_category?.name,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    accessorFn: (data) => data.subject?.name,
  },
  {
    accessorKey: "purchases_number",
    header: "Purchases",
  },
  {
    accessorKey: "author",
    header: "Instutions",
  },

  {
    accessorKey: "uploadedOn",
    header: "Uploaded On",
    cell: ({ row }) => {
      return new Date(row.original.last_updated_time).toDateString();
    },
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
                <ViewExamMaterial exam_material={info.row.original} />
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
                Delete Exam Material
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
