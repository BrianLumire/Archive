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
import { SingleCustomerPage } from "@/components/dashboard/pageUis/customer_agent";
const Page = () => {
  return (
    <div className="px-4">
      <div className="fx flex-col">
        <h5 className="dts3 font-bold">Dashboard</h5>
        <div className="fx--c gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin">Rightson Tole</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/customers">Customers</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <SingleCustomerPage />
    </div>
  );
};

export default Page;
