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
  changePasswordSchema,
  IAccountEditSettingsSchema,
  IChangePasswordSchema,
} from "../../schema/main.schema";
import { createFormData } from "../../inputs";
import { useAuth } from "../../auth/AuthContext";
import { useChangePassword, useEditUserAccount } from "@/hooks/api/useUser";

export default function Security() {
  const { toast } = useToast();
  const { user, fetchUser } = useAuth();
  const { handlePromise, loading } = useCustomLoader();
  const { mutateAsync: editUser } = useChangePassword();
  const { data: regions } = useGetRegions();
  const form = useForm<IChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });
  const onSubmit = (data: IChangePasswordSchema) => {
    const validatedData = changePasswordSchema.parse(data);

    if (!validatedData) {
      toast({
        title: "Error",
        description: "Invalid data",
      });
    }
    const formData = createFormData(data);
    return handlePromise({
      func: async () => await editUser(formData),
      successText: "Password Updated",
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
            <h6 className="opacity-60">Change Password</h6>
          </div>
          <div className="fx-col py-4  rpx gap-5 overflow-auto flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Current Password *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="New Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password * </FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" {...field} />
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
