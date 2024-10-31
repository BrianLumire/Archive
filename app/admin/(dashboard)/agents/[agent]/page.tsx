"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { SingleAgentPage } from "@/components/dashboard/pageUis/single_agent";
import { useGetSingleAgent } from "@/hooks/api/useAgents";
import NotFoundUI, {
  PageLoading,
} from "@/components/dashboard/shared/dashboard_page_etc";
const Page = ({
  params,
}: {
  params: {
    agent: string;
  };
}) => {
  const { data: agent, isPending } = useGetSingleAgent(params.agent);
  if (isPending) return <PageLoading />;
  if (agent)
    return (
      <div className="px-4">
        <div className="fx flex-col">
          <h5 className="dts3 font-bold">{agent.full_name}</h5>
          <div className="fx--c gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin">Mentors</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin/agents">{agent.full_name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <SingleAgentPage agentId={params.agent} />
      </div>
    );
  else
    <NotFoundUI
      title="Agent not found"
      message="The agent you are looking for does not exist."
    />;
};

export default Page;
