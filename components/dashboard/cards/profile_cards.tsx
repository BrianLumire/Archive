"use client";
import { TIcon } from "@/lib/types/ui.types";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import {
  CalendarCheck,
  Check,
  Loader2,
  MapPin,
  Pencil,
  Phone,
  User,
  User2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FaCheckCircle, FaEyeSlash } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { IoCopyOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { useEditAgent, useGetSingleAgent } from "@/hooks/api/useAgents";
import { IAgent, ICustomer, IUser } from "@/lib/types/data.types";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useGetCustomers } from "@/hooks/api/useCustomers";
import { useEffect, useState } from "react";
import { useCustomLoader } from "../shared";
const Info = (props: {
  icon?: TIcon;
  title: string | number;
  value?: string | number | null;
}) => {
  return (
    <FB className="text-sm fx-btw fx--c py-2 ">
      <div className="fx--c gap-2">
        {props.icon && <props.icon size={16} />}
        <span className="">{props.title}</span>
      </div>
      <span className="font-semibold">{props.value}</span>
    </FB>
  );
};
const FB = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) => (
  <div className={cn("fb w-full py-2 items-center", className)}>{children}</div>
);
const Title = (props: { title: string; icon?: TIcon }) => (
  <div className="pt-2">
    <FB>
      <span className="text-grayish text-sm">{props.title}</span>
      {props.icon && (
        <Button size="xs" variant={"secondary"}>
          <props.icon size={16} />
        </Button>
      )}
    </FB>
    <Separator />
  </div>
);

export const AgentsProfileCard = ({
  agent,
  isPending,
}: {
  agent: IAgent;
  isPending: boolean;
}) => {
  const data = [
    {
      title: "Basic Information",
      items: [
        {
          title: "Name ",
          value: agent.full_name,
          icon: User,
        },
        {
          title: "Region",
          value: agent.region?.name,
          icon: MapPin,
        },
        {
          title: "Email",
          value: agent.email,
          icon: MdOutlineEmail,
        },
        {
          title: "School",
          value: agent.institution,
          icon: FaSchool,
        },
      ],
    },
    {
      title: "Contact Information",
      items: [
        {
          title: "Commission Earned",
          value: `Ksh ${agent.commision_total}`,
          icon: CiMoneyBill,
        },
        // {
        //   title: "Paid Out",
        //   value: `Ksh ${agent.}`,
        //   icon: CiMoneyBill,
        // },
        {
          title: "Phone Number",
          value: agent.phone_number,
          icon: IoCallOutline,
        },
      ],
    },
  ];
  const { mutateAsync: editAget } = useEditAgent();

  const { handlePromise, loading, setModalOpen } = useCustomLoader();
  const handleDeactivate = () => {
    console.log("deactivate");
    handlePromise({
      func: async () => await editAget({ id: agent.id, is_active: false }),
      successText: agent?.is_active ? "Agent Deactivated" : "Agent Activated",
    });
  };
  return (
    <div
      className=" bg-card px-4 py-5  h-min w-full
        border rounded-lg border-b "
    >
      <div className="bg-muted rounded-lg fx rpx gap-5 justify-center items-center py-4 flex-col">
        <Avatar className=" bg-black  ">
          <AvatarImage src={"/"} />
          <AvatarFallback className="rounded-full ring-1 ring-primary">
            {agent.full_name &&
              agent.full_name
                .split(" ")
                ?.map((name) => name[0])
                .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="fx--c  h-5 items-center space-x-4 text-sm">
          <div className="fx--c gap-1">
            <FaCheckCircle className="text-primary" />
            <span>{agent.total_referrals} Referrals</span>
          </div>
          <Separator orientation="vertical" />
          <div className="fx--c">
            <CiUser />
            <span>
              Code :
              <span className="font-semibold">
                {agent.agent_code ? agent.agent_code : "Not available"}
              </span>
            </span>
          </div>
          {/* <Button variant={"ghost"} size={"sm"}> */}
          <div
            onClick={() => {
              navigator.clipboard.writeText(agent.agent_code || "");
              agent.agent_code && toast.success("Copied to clipboard");
            }}
            className="cursor-pointer"
          >
            <IoCopyOutline />
          </div>
          {/* </Button> */}
        </div>
      </div>
      <div className="fx-col gap-2">
        {data.map((item, index) => (
          <div key={index} className="w-full">
            <Title title={item.title} />
            <div className="gap-2">
              {item.items.map((info, index) => (
                <Info
                  key={index}
                  title={info.title}
                  icon={info.icon}
                  value={info.value}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div className="mt-5">
        <Button
          className="text-destructive w-full fx--c gap-1"
          variant={"outline"}
          // disabled={isPending}
          onClick={handleDeactivate}
        >
          {loading && <Loader2 className="animate-spin" />}
          <FaEyeSlash />
          {agent.is_active ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </div>
  );
};

export const CustomerProfileCard = () => {
  const { customer: id } = useParams<{ customer: string }>();
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const { data: cust } = useGetCustomers({
    id,
  });
  useEffect(() => {
    if (cust) {
      setCustomer(cust.results[0]);
    }
  }, [cust]);

  const data = [
    {
      title: "Basic Information",
      items: [
        {
          title: "Phone Number",
          value: customer?.phone_number,
          icon: Phone,
        },
        {
          title: "Reffered By",
          value: customer?.referral_agent?.full_name,
          icon: User,
        },
        // {
        //   title: "Email",
        //   value: customer?.email,
        //   icon: MdOutlineEmail,
        // },
      ],
    },
    {
      title: "Finances Details",
      items: [
        {
          title: "Total Comission",
          value: customer?.amount_spent,
          icon: CiMoneyBill,
        },
      ],
    },
  ];

  const { mutateAsync: editAget, isPending } = useEditAgent();

  const { handlePromise, loading, setModalOpen } = useCustomLoader();
  // const handleDeactivate = () => {
  //   console.log("deactivate");
  //   handlePromise({
  //     func: async () => await editAget({ id: cust.id, is_active: false }),
  //     successText: "Agent Deactivated",
  //   });
  // };
  const handleDeactivate = () => {
    if (!customer) return;
    handlePromise({
      func: async () => await editAget({ id: customer.id, is_active: false }),
      successText: customer.is_active
        ? "Customer Deactivated"
        : "Customer Activated",
    });
  };
  return (
    <div
      className=" bg-card px-4 py-5  h-min w-full
        border rounded-lg border-b "
    >
      <div className="bg-muted rounded-lg fx rpx gap-5 justify-center items-center py-4 flex-col">
        <Avatar className=" bg-black  ">
          <AvatarImage src={"/"} />
          <AvatarFallback className="rounded-full ring-1 ring-primary">
            <User2 size={20} />
          </AvatarFallback>
        </Avatar>
        <div className="fx--c  h-5 items-center space-x-4 text-sm">
          <div className="fx--c gap-1">
            <FaCheckCircle className="text-primary" />
            <span>{customer?.total_purchases}</span>
            <span>Purchases</span>
          </div>
          <Separator orientation="vertical" />
          <div className="fx--c gap-1">
            {/* <CiUser /> */}
            <span className="fx-col items-center justify-center">
              <span>Code :</span>

              <span className="font-semibold"> {customer?.referral_code}</span>
            </span>
          </div>
          {/* <Button variant={"ghost"} size={"sm"}> */}
          <div
            onClick={() => {
              navigator.clipboard.writeText(customer?.agent_code || "");
              customer &&
                customer.agent_code &&
                toast.success("Copied to clipboard");
            }}
            className="cursor-pointer"
          >
            <IoCopyOutline />
          </div>
          {/* </Button> */}
        </div>
      </div>
      <div className="fx-col gap-2">
        {data.map((item, index) => (
          <div key={index} className="w-full">
            <Title title={item.title} />
            <div className="gap-2">
              {item.items.map((info, index) => (
                <Info
                  key={index}
                  title={info.title}
                  icon={info.icon}
                  value={info.value}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* <Separator /> */}
      <div className="mt-5">
        <Button
          className="text-destructive w-full fx--c gap-1"
          variant={"outline"}
          // disabled={isPending}
          onClick={handleDeactivate}
        >
          {loading && <Loader2 className="animate-spin" />}
          <FaEyeSlash />
          {customer?.is_active ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </div>
  );
};
