import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import { useGetProducts } from "@/hooks/api/useProducts";
import { Separator } from "@/components/ui/separator";
import { CustomBasicTable } from "../tables/shared";
const View_Customer_Stats_Model = () => {
  const { data: products } = useGetProducts({});
  ///dashboard/payments/users/list/?owner=50
  return (
    <Dialog>
      <DialogTrigger>
        {/* <Button onClick={() => setOpen(true)} variant="outline"> */}
        View Customer Stats
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] fx-col max-h-[90vh]">
        <DialogHeader className="border-b py-2">
          <DialogTitle>View Details and Statistics</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 flex-grow overflow-auto">
          <div className="fx-col py-2">
            <div className="fx gap-2">
              <Avatar className={`text-primary bg-secondary/10 h-14 w-14`}>
                <AvatarFallback className="bg-secondary/5 ">
                  <ShoppingBag className="text-secondary" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h3 className="dts5 font-semibold">3</h3>
                <span className="text-sm">Purchases</span>
              </div>
            </div>
          </div>
        </div>
        <div className="fx fx-col gap-2">
          <h1 className="dts4">Purchases</h1>
          <Separator />
          <CustomBasicTable
            data={
              products
                ? products.results.map((product) => ({
                    "Product Name": product.title,
                    Date: new Date(product.creation_time).toDateString(),
                  }))
                : []
            }
            columnsHeaders={[
              {
                title: "Product Name",
                className: "",
              },
              {
                title: "Date",
                className: "",
              },
            ]}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default View_Customer_Stats_Model;
