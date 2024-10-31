import React, { createContext, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import { IStep } from "@/lib/types/ui.types";

type StepsModalProps = {
  steps: IStep[];
  triggerButtonText?: string;
  activeStep: number;
  step_component: ReactNode;
  maxWidth?: string;
  triggerButton?: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function StepsModal({
  activeStep,
  steps,

  triggerButtonText,

  step_component,
  maxWidth,
  triggerButton,
  open,
  setOpen,
}: StepsModalProps) {
  const content = steps[activeStep]?.content;
  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {triggerButton ? (
          triggerButton
        ) : (
          <Button>
            <Plus size={20} />
            <span className="text-sm">{triggerButtonText}</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        className={clsx("p-0 overflow-hidden", maxWidth ?? "sm:max-w-[850px] ")}
        close={false}
      >
        <div className="grid grid-cols-3 w-full ">
          <div className="border-r border-border space-y-6 p-4">
            <div className="fx gap-2">
              <h4 className="h4 font-semibold">{steps[activeStep]?.title}</h4>
            </div>
            {step_component}
          </div>
          <div className="fx-col col-span-2  bg-card max-h-[90vh] min-h-[80vh] flex-col flex ">
            <DialogHeader className="border-b px-4 py-3 ">
              <div className="fx-btw-c">
                <h4 className="h4 ">{steps[activeStep]?.title}</h4>
                <DialogClose asChild onClick={() => setOpen(false)}>
                  <Button variant="outline" size="icon" className="w-8 h-8">
                    <IoClose className="text-xl" />
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>
            <div className="h-full flex-grow ">{content}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
