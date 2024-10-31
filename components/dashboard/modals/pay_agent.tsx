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
import { zodResolver } from "@hookform/resolvers/zod";

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

import { useCustomLoader } from "../shared";
import { IAgent } from "@/lib/types/data.types";
import { CiMoneyBill } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { z } from "zod";
import { usePayAgent } from "@/hooks/api/useFinances";

export function PayAgent({ agent }: { agent: IAgent }) {
  const payAgentSchema = z
    .object({
      agent: z.string(),
      total: z.number().min(1),
      pending_commission: z.number(),
    })
    .refine(
      (data) => {
        return data.total <= data.pending_commission;
      },
      {
        path: ["total"],
        message:
          "Amount to pay must be less than or equal to pending commission",
      }
    );

  type IPayAgentSchema = z.infer<typeof payAgentSchema>;

  const { handlePromise, modalOpen, setModalOpen, loading } = useCustomLoader();
  const { mutateAsync: payAgent } = usePayAgent();
  const form = useForm<IPayAgentSchema>({
    resolver: zodResolver(payAgentSchema),
    defaultValues: {
      agent: agent.id.toString(),
      pending_commission: agent.commision_total,
    },
  });
  const onSubmit = (data: IPayAgentSchema) => {
    const formData = createFormData(data);
    handlePromise({
      func: async () => await payAgent(formData),
      onSuccess: () => {
        form.reset();
        setModalOpen(false);
      },
      successText: "Payment Recorded",
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary/10 text-primary fx gap-1 hover:bg-primary hover:text-white">
          <CiMoneyBill size={20} />
          <span> Make Payment</span>
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="sm:max-w-[850px]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full  max-h-[90vh] overflow-hidden fx-col  "
          >
            <DialogHeader className="border-b py-1">
              <DialogTitle>Pay to Mentor</DialogTitle>
            </DialogHeader>
            <div className="fx-col py-4  rpx gap-8 overflow-auto flex-grow">
              <div className="fx-col gap-5">
                <FormField
                  control={form.control}
                  name="agent"
                  render={({ field }) => (
                    <FormItem>
                      <div className="fx-col gap-3">
                        <FormLabel>Mentor *</FormLabel>
                        <FormControl>
                          <Input
                            className="hidden "
                            {...field}
                            value={field.value}
                            readOnly
                            // className="border-none outline-none"
                          />
                        </FormControl>
                        <span>{agent.full_name}</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <FormField
                  control={form.control}
                  name="pending_commission"
                  render={({ field }) => (
                    <FormItem className="border-b pb-1 border-foreground ">
                      <FormLabel>Pending Commission</FormLabel>
                      <div className="fx gap-5 items-end">
                        <FormControl className="w-[200px]">
                          <Input
                            placeholder="Agent Balance"
                            {...field}
                            value={field.value}
                            className="border-none hidden  outline-none focus:outline-none focus:border-none"
                            readOnly
                          />
                        </FormControl>
                        <span>
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "KSH",
                          }).format(field.value)}
                        </span>
                        <div className="fx--c gap-2">
                          <span className="">Amount To Pay</span>
                          <FaArrowRightLong size={20} />
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Email * </FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="Enter Amount To Pay"
                          {...field}
                          type="number"
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                Record Payment
                {loading && <Loader2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
