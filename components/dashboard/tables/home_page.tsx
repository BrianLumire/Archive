import { IDashboardStats } from "@/lib/types/data.types";
import { top_agents } from "../data/mock_data";
import { CustomBasicTable } from "./shared";

export const TopAgentTable = ({
  agentStats,
}: {
  agentStats: IDashboardStats["top_statistics"]["top_agents"];
}) => {
  return (
    <CustomBasicTable
      columnsHeaders={[
        { title: "Name", className: "w-1/2" },
        { title: "Sales", className: "w-1/2" },
      ]}
      data={agentStats}
    />
  );
};
export const TopRegionsTable = ({
  top_regions,
}: {
  top_regions: IDashboardStats["top_statistics"]["top_regions"];
}) => {
  return (
    <CustomBasicTable
      columnsHeaders={[
        { title: "Name", className: "w-1/2" },
        { title: "Sales", className: "w-1/2" },
      ]}
      data={top_regions}
    />
  );
};
export const TopItemsTable = ({
  top_products,
}: {
  top_products: IDashboardStats["top_statistics"]["top_products"];
}) => {
  return (
    <CustomBasicTable
      columnsHeaders={[
        { title: "Name", className: "w-1/2" },
        { title: "Sales", className: "w-1/2" },
      ]}
      data={top_products}
    />
  );
};
