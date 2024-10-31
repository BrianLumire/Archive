import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  IExamMaterials,
  newAgentSchema,
  INewAgentSchema,
} from "../schema/main.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createFormData, CustomFileInput } from "../inputs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FaRegFilePdf } from "react-icons/fa";
import { useCustomLoader } from "../shared";
import { api } from "@/lib/api";
import { useAddProducts } from "@/hooks/api/useProducts";
import { useGetRegions } from "@/hooks/api/useRegions";
import { useAddAgent } from "@/hooks/api/useAgents";

export function AddAgent() {
  const { toast } = useToast();
  const { handlePromise, modalOpen, setModalOpen, loading } = useCustomLoader();
  const { mutateAsync: addAgent } = useAddAgent();
  const { data: regions } = useGetRegions();
  const form = useForm<INewAgentSchema>({
    resolver: zodResolver(newAgentSchema),
  });
  const onSubmit = (data: INewAgentSchema) => {
    const validatedData = newAgentSchema.parse(data);
    if (!validatedData) {
      toast({
        title: "Error",
        description: "Invalid data",
      });
    }
    const formData = createFormData(data);
    return handlePromise({
      func: async () => await addAgent(formData),
      successText: "Agent Created Successfully",
      onSuccess: () => {
        form.reset();
        setModalOpen(false);
      },
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={20} />
          Add Mentors
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="sm:max-w-[800px]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full  max-h-[90vh] overflow-hidden fx-col  "
          >
            <DialogHeader className="border-b py-1">
              <DialogTitle>Create A New Agent</DialogTitle>
            </DialogHeader>
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
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {regions?.map((region) => {
                                return (
                                  <SelectItem
                                    key={region.id}
                                    value={region.id.toString()}
                                  >
                                    {region.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                {/* institutions */}
                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Institution" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                Submit
                {loading && <Loader2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
