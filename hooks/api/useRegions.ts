import { api } from "@/lib/api";
import { IRegion } from "@/lib/types/data.types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetRegions = () => {
  return useQuery<IRegion[]>({
    queryKey: ["regions"],
    queryFn: () => api.get("/dashboard/regions/list/").then((res) => res.data),
  });
};

//Add and Remove Regions

export const useAddRegion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["regions"],
    mutationFn: (data: any) =>
      api.post("/dashboard/regions/list/", data).then((res) => res.data),
    onSettled: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "regions",
      });
    },
  });
};
///dashboard/region/delete/{id}/

export const useDeleteRegion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["regions"],
    mutationFn: (id: number) =>
      api.delete(`/dashboard/region/delete/${id}/`).then((res) => res.data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["regions"],
      });
    },
  });
};
