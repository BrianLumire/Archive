import { api } from "@/lib/api";
import {
  IAgent,
  IAgentResponse,
  IAgentStatistics,
  ICustomerPurchasesResponse,
  ICustomerResponse,
  ICustomerStatistics,
  IUser,
  IUserResponse,
} from "@/lib/types/data.types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
export const useGetCustomers = (query?: { id?: string }) => {
  return useQuery<ICustomerResponse>({
    queryKey: ["customers", query],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/users/list/", {
        params: query,
      });
      return data;
    },
  });
};
export const useGetAllCustomers = ({
  page = 1,
  ...query
}: {
  page: number;
  search?: string;
}) => {
  return useQuery<ICustomerResponse>({
    queryKey: ["customers", query, page],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/users/list/", {
        params: query,
      });
      return data;
    },
  });
};

export const useGetCusomerStatistics = () => {
  return useQuery<ICustomerStatistics>({
    queryKey: ["customer_statistics"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/users/statistics/");
      return data;
    },
  });
};
export const useGetSingleCustomer = (id: string) => {
  return useQuery<IUser>({
    queryKey: ["customer", id],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard/users/${id}/`);
      return data;
    },
  });
};

export const useGetCustomerPurchases = ({
  page = 1,
  ...params
}: {
  owner: string;
  search?: string;
  page: number;
}) => {
  ///dashboard/payments/users/list/?owner=50
  return useQuery<ICustomerPurchasesResponse>({
    queryKey: ["customer_purchases", params, page],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard/payments/users/list/`, {
        params: {
          owner: params.owner,
          page,
          search: params.search,
        },
      });
      return data;
    },
  });
};
