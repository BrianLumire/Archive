import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SingleAgentPage } from "../../pageUis/single_agent";
import SingleSelect from "@/components/ui-extended/single_select";

export const MonthFilter = ({
  value,
  onChange,
  placeholder = "Filter by month",
  triggerLabel,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  triggerLabel: string;
}) => {
  const months = [
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

  return (
    <div>
      <SingleSelect
        onChange={onChange}
        options={months}
        value={value}
        triggerLabel={triggerLabel}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MonthFilter;
//year filter 2024-2030

export const YearFilter = ({
  value,
  onChange,
  placeholder = "Filter by year",
  triggerLabel,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  triggerLabel?: string;
}) => {
  const years = [
    { value: "2024", label: "2024" },
    // { value: "2025", label: "2025" },
    // { value: "2026", label: "2026" },
    // { value: "2027", label: "2027" },
    // { value: "2028", label: "2028" },
    // { value: "2029", label: "2029" },
    // { value: "2030", label: "2030" },
  ];

  return (
    <div>
      <SingleSelect
        onChange={onChange}
        options={years}
        value={value}
        triggerLabel={placeholder}
        placeholder={placeholder}
      />
    </div>
  );
};
