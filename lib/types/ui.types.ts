import { LucideProps } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export type TIcon =
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  | React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
export interface IContextBase {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export interface IStep {
  title: string;
  icon: TIcon;
  content: React.ReactNode;
  // onSidebar?: boolean;
}
