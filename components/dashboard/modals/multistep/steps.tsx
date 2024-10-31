import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { IStep } from "@/lib/types/ui.types";
export const CompoundSteps = ({
  steps,
  setActiveStep,
  activeStep,
}: {
  steps: IStep[];
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
}) => {
  return (
    <div className="fxc gap-10 ">
      {steps.map((step, index) => {
        return (
          <div
            className={cn(
              "flex items-center space-x-2 cursor-pointer",
              activeStep ? "text-primary font-semibold" : "text-foreground"
            )}
            key={index}
          >
            <step.icon size={20} />
            <span className="text-sm leading-none ">{step.title}</span>
          </div>
        );
      })}
    </div>
  );
};
