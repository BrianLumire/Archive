import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { IStep } from "@/lib/types/ui.types";
import { useSettingsContext } from ".";
import { Separator } from "@/components/ui/separator";

export const Steps_Component_Settings = () => {
  const { activeStep, open, setActiveStep, setOpen, steps } =
    useSettingsContext();
  return (
    <div className="fx-col gap-5 ">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            className="fx-col gap-3 cursor-pointer"
            onClick={() => {
              setActiveStep(index);
              // setOpen(true);
            }}
          >
            <div
              className={cn(
                "flex items-center space-x-2 ",
                activeStep === index
                  ? "text-primary font-semibold"
                  : "text-foreground"
              )}
              key={index}
            >
              <Icon size={20} />
              <span className="text-sm leading-none ">{step.title}</span>
            </div>
            <Separator
              className="opacity-25
            "
            />
          </div>
        );
      })}
    </div>
  );
};
