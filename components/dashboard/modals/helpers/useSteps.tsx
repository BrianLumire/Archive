import { useState } from "react";

export const useSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const goToNextActiveStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  return {
    activeStep,
    setActiveStep,
    goToNextActiveStep,
    open,
    setOpen,
  };
};
