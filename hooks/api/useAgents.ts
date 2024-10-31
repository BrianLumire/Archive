import { api } from "@/lib/api";
import {
  IAgent,
  IAgentCommissionsResponse,
  IAgentResponse,
  IAgentStatistics,
  IExtendedUserAgentResponse,
  IUser,
  IUserResponse,
} from "@/lib/types/data.types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetAgents = ({
  page = 1,
  search,
  region,
}: {
  search?: string;
  page?: number;
  region?: string;
} = {}) => {
  return useQuery<IAgentResponse>({
    queryKey: ["agents", page, search, region],
    queryFn: async () => {
      const response = await api
        .get("/dashboard/agent/list/", {
          params: { page, search, region },
        })
        .then((res) => res.data);
      return response;
    },
  });
};
export const useGetAgentsStats = () => {
  return useQuery<IAgentStatistics>({
    queryKey: ["agents/stats"],
    queryFn: async () => {
      const response = await api
        .get("/dashboard/agent/statistics/")
        .then((res) => res.data);
      return response;
    },
  });
};

export const useGetSingleAgent = (id: string) => {
  return useQuery<IAgent>({
    queryKey: ["agents"],
    enabled: !!id,
    queryFn: async () => {
      const response = await api
        .get(`/dashboard/agent/get/${id}`)
        .then((res) => res.data);
      return response;
    },
  });
};

//new agent
export const useAddAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api
        .post("/dashboard/agent/create/", data)
        .then((res) => res.data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agents"],
      });
    },
  });
};

// /dashboard/users/list/?referral_code //get agrent reffereals[users]
export const useGetAgentReferrals = ({
  page = 1,
  search,
  agent,
}: {
  page?: number;
  search?: string;
  agent?: string;
}) => {
  return useQuery<IExtendedUserAgentResponse>({
    queryKey: ["agents/referrals", agent, page, search],
    queryFn: async () => {
      const response = await api
        .get(`/dashboard/users/list`, {
          params: { page, search, referral_code: agent },
        })
        .then((res) => res.data);
      return response;
    },
    enabled: !!agent,
  });
};

///dashboard/agent/commission/FG-204

export const useGetAgentCommission = ({
  page = 1,
  search,
  agent,
}: {
  page?: number;
  search?: string;
  agent?: string;
}) => {
  return useQuery<IAgentCommissionsResponse>({
    queryKey: ["agents/commission", agent, page, search],
    queryFn: async () => {
      const response = await api
        .get(`/dashboard/agent/commission/${agent}`, {
          params: { page, search },
        })
        .then((res) => res.data);
      return response;
    },
    enabled: !!agent,
  });
};

////dashboard/agent/get/{id}/
//edit agent
export const useEditAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: Partial<IAgent> & {
        id: IAgent["id"];
      }
    ) => {
      const response = await api
        .patch(`/dashboard/agent/get/${data.id}/`, data)
        .then((res) => res.data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
    },
  });
};
