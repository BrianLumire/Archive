import { AgentsProfileCard, CustomerProfileCard } from "../cards/profile_cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentReferral, ComissionEarned, CustomerPurchases } from "../tables";
export const SingleCustomerPage = () => {
  ///dashboard/payments/users/list/?owner=50
  return (
    <div className="flex gap-2 mt-5">
      <div className="w-full max-w-[300px] flex-shrink-0">
        <CustomerProfileCard />
      </div>
      <div className="flex-grow bg-card border border-border mpy rounded-lg">
        <CustomersTable />
      </div>
    </div>
  );
};

const CustomersTable = () => {
  return (
    <div defaultValue="purchases" className="w-full">
      <div className="rpx pt-4">
        <h1 className="ts5 font-semibold">Purchases</h1>
      </div>
      <div>
        <CustomerPurchases />
      </div>
    </div>
  );
};
