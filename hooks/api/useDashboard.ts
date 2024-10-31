import { api } from "@/lib/api";
import { IDashboardStats, IProductStats } from "@/lib/types/data.types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetDashboardStats = () => {
  return useQuery<IDashboardStats>({
    queryKey: ["dashboard"],
    queryFn: async () =>
      await api.get("/dashboard/statistics/").then((res) => res.data),
  });
};
export const useGetProductStats = () => {
  return useQuery<IProductStats>({
    queryKey: ["product-stats"],
    queryFn: async () =>
      await api.get("/dashboard/products/statistics/").then((res) => res.data),
  });
};
