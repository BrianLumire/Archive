import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

export interface Option {
  value: string;
  label: string;
}

interface SingleSelectProps {
  triggerLabel: string;
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  value,
  onChange,
  triggerLabel,
  placeholder = "Select",
}) => {
  const handleSelectChange = (newValue: string) => {
    onChange(newValue);
  };

  const handleRemoveTag = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onChange(null);
  };

  const selectedOption = options.find((opt) => opt.value === value);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fx--c gap-2">
      <Select onValueChange={handleSelectChange} value={value || undefined}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="p-2">{triggerLabel}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedOption && (
        <Badge variant="secondary" className="flex items-center gap-1 h-8 ">
          {selectedOption.label}
          <X size={14} className="cursor-pointer" onClick={handleRemoveTag} />
        </Badge>
      )}
    </div>
  );
};

export default SingleSelect;
