import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
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
import { useGetRegions } from "@/hooks/api/useRegions";
import { useAddAgent } from "@/hooks/api/useAgents";
import { useCustomLoader } from "../../shared";
import {
  accountEditSettingsSchema,
  IAccountEditSettingsSchema,
} from "../../schema/main.schema";
import { createFormData } from "../../inputs";
import { useAuth } from "../../auth/AuthContext";
import { useEditUserAccount } from "@/hooks/api/useUser";

export function Account() {
  const { toast } = useToast();
  const { user, fetchUser } = useAuth();
  const { handlePromise, loading } = useCustomLoader();
  const { mutateAsync: editUser } = useEditUserAccount();
  const { data: regions } = useGetRegions();
  const form = useForm<IAccountEditSettingsSchema>({
    resolver: zodResolver(accountEditSettingsSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      email: user?.email,
      phone_number: user?.phone_number || "",
    },
  });
  const onSubmit = (data: IAccountEditSettingsSchema) => {
    const validatedData = accountEditSettingsSchema.parse(data);
    //console log all errors in the form
    console.log(validatedData);
    if (!validatedData) {
      toast({
        title: "Error",
        description: "Invalid data",
      });
    }
    const formData = createFormData(data);
    return handlePromise({
      func: async () => await editUser(formData),
      successText: "Personal Details Updated",
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
          className="w-full h-full overflow-hidden fx-col  "
        >
          <div className="border-b py-1 ">
            <h6 className="opacity-60">Personal Details</h6>
          </div>
          <div className="fx-col py-4  rpx gap-5 overflow-auto flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Phone Number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email * </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="fx justify-end">
            <Button type="submit" disabled={loading}>
              Submit
              {loading && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
