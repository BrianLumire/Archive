import { api } from "@/lib/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useEditUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.patch("/users/user/", data);
    },
  });
};

///users/user/password/change/
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/users/user/password/change/", data);
    },
  });
};
