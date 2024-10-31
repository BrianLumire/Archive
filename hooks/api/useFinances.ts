import { api } from "@/lib/api";
import {
  IAgentEarningQueryParams,
  IAgentEarningsResponse,
  IAgentResponse,
  IFinancesStatistics,
  IPaymentToAgentQueryParams,
  IPaymentToAgentResponse,
  IRegion,
  ISalesIncome,
  ISalesIncomesResponse,
  ISalesInterfaceQueryParams,
} from "@/lib/types/data.types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetFinancesStats = () => {
  return useQuery<IFinancesStatistics>({
    queryKey: ["finances-stats"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/payments/statistics/");
      return data;
    },
  });
};

export const useGetAgentEarnings = ({
  page = 1,
  ...params
}: IAgentEarningQueryParams) => {
  return useQuery<IAgentEarningsResponse>({
    queryKey: ["agent_earnings", params, page],
    queryFn: async () => {
      const { data } = await api.get(
        "/dashboard/payments/agent/earnings/list/",
        {
          params: {
            page,
            ...params,
          },
        }
      );
      return data;
    },
  });
};

// /dashboard/payments/users/list/
//get sales income
export const useGetSalesIncome = ({
  page = 1,
  ...params
}: ISalesInterfaceQueryParams) => {
  return useQuery<ISalesIncomesResponse>({
    queryKey: ["sales_income", params, page],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/payments/users/list/", {
        params: {
          page,
          ...params,
        },
      });
      return data;
    },
  });
};

//payemnt to agents
/////dashboard/payments/agent/payments/list/ endpoint

export const useGetPaymentToAgents = ({
  page = 1,
  ...params
}: IPaymentToAgentQueryParams) => {
  return useQuery<IPaymentToAgentResponse>({
    queryKey: ["payment_to_agents", params, page],
    queryFn: async () => {
      const { data } = await api.get(
        "/dashboard/payments/agent/payments/list/",
        {
          params: {
            page,
            ...params,
          },
        }
      );
      return data;
    },
  });
};
//dashboard/payments/agent/make/payment/
export const usePayAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const { data: response } = await api.post(
        "/dashboard/payments/agent/make/payment/",
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agents"],
      });
    },
  });
};
