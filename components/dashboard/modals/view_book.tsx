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
import { Separator } from "@/components/ui/separator";
import { IProduct } from "@/lib/types/data.types";
import { urlBuilder } from "@/lib/utils";
import { Play, ShoppingBag, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ViewBook({ book }: { book: IProduct }) {
  return (
    <Dialog>
      <DialogTrigger>
        {/* <Button onClick={() => setOpen(true)} variant="outline"> */}
        View Product
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] fx-col max-h-[90vh]">
        <DialogHeader className="border-b py-2">
          <DialogTitle>View Details and Statistics</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 flex-grow overflow-auto">
          <div className="grid col-span-1 md:grid-cols-3 gap-5 ">
            <div className="col-span-2  ">
              <h3 className="dts5 font-semibold">{book.title}</h3>
              <p>Uploaded on {new Date(book.creation_time).toDateString()}</p>
            </div>
            <div className="w-full">
              <div className="fx-c-c relative h-[180px] w-[250px] overflow-hidden rounded-md">
                <Button
                  asChild
                  className="bg-secondary h-[40px] p-0 w-[40px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Link href={urlBuilder(book.media_file)} target="_blank">
                    <SquareArrowOutUpRight className="text-xl" size={20} />
                  </Link>
                </Button>
                <img
                  src={urlBuilder(book.thumbnail)}
                  alt={book.title}
                  className="rounded-md overflow-hidden object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="fx-col">
              <h3 className="dts6 ">Statistics</h3>
              <Separator />
            </div>
            <div className="fx-col py-2">
              <div className="fx gap-2">
                <Avatar className={`text-primary bg-secondary/10 h-14 w-14`}>
                  <AvatarFallback className="bg-secondary/5 ">
                    <ShoppingBag className="text-secondary" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h3 className="dts5 font-semibold">
                    {book.purchases_number}
                  </h3>
                  <span className="text-sm">Purchases</span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="fx-col py-2">
              <h3 className="dts6 ">Details</h3>
              <Separator />
            </div>
            <div className="fx-col gap-2">
              <Td desc={`Ksh ${book.price}`} title="Price:" />
              <div className="fx gap-5">
                <Td desc={book?.pages || "N/A"} title="Pages:" />{" "}
              </div>
              <Td desc={book.description || "N/A"} title="Description:" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
const Td = ({ title, desc }: { title: string; desc?: string | number }) => {
  return (
    <div className="fx-col ">
      <h6 className="opacity-70">{title}</h6> <p>{desc}</p>
    </div>
  );
};
