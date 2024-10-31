import { AgentsProfileCard } from "../cards/profile_cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentReferral, ComissionEarned } from "../tables";
import { useGetSingleAgent } from "@/hooks/api/useAgents";
import { IAgent, IUser } from "@/lib/types/data.types";
export const SingleAgentPage = ({ agentId }: { agentId: string }) => {
  const { data: single_agent, isPending } = useGetSingleAgent(agentId);
  if (isPending) return <div>Loading...</div>;
  if (single_agent) {
    return (
      <div className="flex gap-2 mt-5">
        <div className="w-full max-w-[300px] flex-shrink-0">
          <AgentsProfileCard agent={single_agent} isPending={isPending} />
        </div>

        <div className="flex-grow bg-card border border-border mpy rounded-lg">
          <AgentsTable agent={single_agent} />
        </div>
      </div>
    );
  } else return <div>Agent not found</div>;
};

const AgentsTable = ({ agent }: { agent: IAgent }) => {
  return (
    <Tabs defaultValue="referrals" className="w-full">
      <TabsList>
        <TabsTrigger value="referrals">Referrals</TabsTrigger>
        <TabsTrigger value="commission">Commission Earnings</TabsTrigger>
      </TabsList>
      <TabsContent value="referrals">
        <AgentReferral agent={agent} />
      </TabsContent>
      <TabsContent value="commission">
        <ComissionEarned agent={agent} />
      </TabsContent>
    </Tabs>
  );
};
