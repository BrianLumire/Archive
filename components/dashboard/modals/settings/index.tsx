"use client";
import React, { Dispatch } from "react";
import { createContext } from "react";
import { useSteps } from "../helpers/useSteps";
import { IContextBase, IStep } from "@/lib/types/ui.types";
import { StepsModal } from "../multistep";
import { Steps_Component_Settings } from "./steps_component";
import { RiSettingsFill } from "react-icons/ri";
import { Fingerprint, Map, User } from "lucide-react";
import Security from "./security";
import Regions from "./regions";
import { Account } from "./account";
export interface TSettingsContext extends IContextBase {
  steps: IStep[];
}
const SettingsContext = createContext<TSettingsContext | null>(null);

export function SettingsModal() {
  const { activeStep, goToNextActiveStep, setActiveStep, open, setOpen } =
    useSteps();
  return (
    <SettingsContext.Provider
      value={{ activeStep, setActiveStep, open, setOpen, steps }}
    >
      <StepsModal
        {...{
          open,
          setOpen,
          activeStep,
          setActiveStep,
          goToNextActiveStep,
          steps,
          step_component: <Steps_Component_Settings />,
          triggerButton: (
            <div className="fx gap-1">
              <RiSettingsFill size={16} />
              <span>Settings</span>
            </div>
          ),
        }}
      />
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider"
    );
  }
  return context;
};
const steps = [
  {
    title: "Account Settings",
    icon: User,
    content: <Account />,
  },
  {
    title: "Security Settings",
    icon: Fingerprint,
    content: <Security />,
  },
  {
    title: "Manage Regions",
    icon: Map,
    content: <Regions />,
  },
];
