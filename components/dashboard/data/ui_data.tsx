import { Home, Wallet } from "lucide-react";
import { UserCog } from "lucide-react";
import { User } from "lucide-react";
import { UserCheck } from "lucide-react";
import { Send } from "lucide-react";
export const sidebar_links_admin = [
  {
    type: "Overview",
    links: [
      {
        name: "Dashboard",
        icon: Home,
        path: "/admin",
      },
      // <Wallet />,
      {
        name: "Finances",
        icon: Wallet,
        path: "/admin/finances",
      },
    ],
  },
  {
    type: "Pages",
    links: [
      {
        name: "Manage Media",
        icon: UserCog,
        path: "/admin/media",
      },
      {
        name: "Manage Mentors",
        icon: User,
        path: "/admin/agents",
      },
      {
        name: "Manage Customers",
        icon: Send,
        path: "/admin/customers",
      },
    ],
  },
];

export const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
