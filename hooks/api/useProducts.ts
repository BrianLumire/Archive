import { api } from "@/lib/api";
import {
  IProductQueryParams,
  IProductsResponse,
  IProductType,
} from "@/lib/types/data.types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
///dashboard/products/list/?sub_category=4&product_type=1 filter
export const useGetProducts = ({
  page = 1,
  ...params
}: IProductQueryParams) => {
  return useQuery<IProductsResponse>({
    queryKey: ["products", params, page],
    queryFn: async () => {
      return await api
        .get(`/dashboard/products/list`, {
          params: {
            ...params,
            page,
          },
        })
        .then((res) => res.data);
    },
    // placeholderData: keepPreviousData,
  });
};
export const useAddProducts = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["products"],
    mutationFn: async (newBook: FormData) => {
      return await api.post("/dashboard/products/create/", newBook, {
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
            )
          );
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  return {
    ...mutation,
    uploadProgress,
  };
};

//edit product , progress bar
export const useEditProduct = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["products"],
    mutationFn: async ({ data, id }: { data: FormData; id: number }) => {
      return await api.put(`/dashboard/products/get/${id}`, data, {
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
            )
          );
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  return {
    ...mutation,
    uploadProgress,
  };
};

export const useGetProductTypes = () => {
  return useQuery<IProductType[]>({
    queryKey: ["product_types"],
    queryFn: async () => {
      return await api.get("/products/product/types").then((res) => res.data);
    },
  });
};

///dashboard/products/get/{id}/
//delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["products"],
    mutationFn: async (id: number) => {
      return await api.delete(`/dashboard/products/get/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

///products/product/types/?id=3 get Product types
export const useGetProductType = (id: number) => {
  return useQuery<IProductType>({
    queryKey: ["product_type", id],
    queryFn: async () => {
      return await api
        .get(`/products/product/types/?id=${id}`)
        .then((res) => res.data[0]);
    },
  });
};
