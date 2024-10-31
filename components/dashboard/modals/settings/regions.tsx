import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FaRegFilePdf } from "react-icons/fa";
import { api } from "@/lib/api";
import { useAddProducts } from "@/hooks/api/useProducts";
import {
  useAddRegion,
  useDeleteRegion,
  useGetRegions,
} from "@/hooks/api/useRegions";
import { useAddAgent } from "@/hooks/api/useAgents";
import { useCustomLoader } from "../../shared";
import {
  accountEditSettingsSchema,
  addRegionSchema,
  IAccountEditSettingsSchema,
  IAddRegionSchema,
} from "../../schema/main.schema";
import { createFormData } from "../../inputs";
import { useAuth } from "../../auth/AuthContext";
import { useEditUserAccount } from "@/hooks/api/useUser";
import { Badge } from "@/components/ui/badge";

const Regions = () => {
  const { toast } = useToast();
  const { user, fetchUser } = useAuth();
  const { handlePromise, loading } = useCustomLoader();
  const { mutateAsync: addRegion } = useAddRegion();
  const { data: regions } = useGetRegions();
  const { mutateAsync: deleteRegion } = useDeleteRegion();
  const form = useForm<IAddRegionSchema>({
    resolver: zodResolver(addRegionSchema),
  });
  const onSubmit = (data: IAddRegionSchema) => {
    const validatedData = addRegionSchema.parse(data);
    if (!validatedData) {
      toast({
        title: "Error",
        description: "Invalid data",
      });
    }
    const formData = createFormData(data);
    return handlePromise({
      func: async () => await addRegion(formData),
      successText: "Region Added",
      onSuccess: () => {
        form.reset();
        fetchUser();
      },
    });
  };
  return (
    <div className="p-4 h-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full overflow-x-hidden fx-col p-2  "
        >
          <div className="fx-col py-4   gap-5 overflow-auto flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Add Region *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter region name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="max-h-[100px]">
              <div className="col-span-2 flex flex-wrap gap-1">
                {
                  //button variant outline and close icon with all the regions

                  regions?.map((region, index) => (
                    <Badge
                      variant={"outline"}
                      key={index}
                      className="fx gap-2 items-center border p-2 bg-transparent rounded-full"
                    >
                      <div>{region.name}</div>
                      <Button
                        className="fx gap-2  h-[10px] px-0  "
                        size={"sm"}
                        variant={"ghost"}
                        type="button"
                        onClick={() => {
                          handlePromise({
                            func: async () => await deleteRegion(region.id),
                            successText: "Region Deleted",
                            onSuccess: () => {
                              fetchUser();
                            },
                          });
                        }}
                      >
                        <X size={15} />
                      </Button>
                    </Badge>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="fx justify-end">
            <Button type="submit" disabled={loading}>
              Save Changes
              {loading && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Regions;
