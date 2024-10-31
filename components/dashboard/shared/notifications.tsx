"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Bell, User, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const NotificationsDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell height={20} width={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        closeBtn={false}
        className="w-[300px] bg-card  overflow-y-auto"
        overlay={false}
      >
        <SheetHeader>
          <div className="fbc">
            <SheetTitle>Notifications?</SheetTitle>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setOpen(false);
              }}
            >
              <X size={20} />
            </Button>
          </div>
        </SheetHeader>
        <div className="fx-c mt-5 space-y-3">
          <span className="p text-sm">Today</span>
          <div className="flex flex-col gap-4">
            {/* {notifications.slice(0, 4).map((notification, index) => (
              <NotificationsCard key={index} {...notification} />
            ))} */}
          </div>
        </div>
        <div className="fx-c mt-5 space-y-3">
          <span className="p text-sm">This week</span>
          <div className="flex flex-col gap-4">
            {/* {notifications.slice(4, 8).map((notification, index) => (
              <NotificationsCard key={index} {...notification} />
            ))} */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface IProps {
  icon: any;
  action: string;
  time: string;
}
const NotificationsCard = (props: IProps) => {
  return (
    <Card>
      <CardContent className="p-2 flex gap-3">
        <div className="rounded-full gap-5 bg-primary/10 min-w-10 text-primary h-10 w-10 fc">
          <props.icon />
        </div>
        <div className="flex flex-grow flex-col ">
          <span className="text-sm text-wrap">{props.action}</span>
          <span className="text-xs text-grayish">{props.time}</span>
        </div>
      </CardContent>
    </Card>
  );
};
