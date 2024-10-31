"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideProps } from "lucide-react";
import { IconType } from "react-icons/lib";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SelectOption {
  value: string;
  label: string;
}

interface StatCardWrapperProps {
  children: React.ReactNode;
  title: string;
  selectOptions?: SelectOption[];
  defaultSelectValue?: string;
  onSelectChange?: (value: string) => void;
  selectPlaceholder?: string;
  className?: string;
}

export const StatCardWrapper: React.FC<StatCardWrapperProps> = ({
  children,
  title,
  selectOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "annually", label: "Annually" },
  ],
  defaultSelectValue = "monthly",
  onSelectChange,
  selectPlaceholder = "Select Timeline",
  className = "",
}) => {
  const handleSelectChange = (value: string) => {
    if (onSelectChange) {
      onSelectChange(value);
    }
  };

  return (
    <div
      className={`rp mt-5 rounded-lg md:border border-border/50 space-y-3 bg-card ${className}`}
    >
      <div className="fx-btw">
        <div className="flex flex-col">
          <div className="dts5 font-semibold">{title}</div>
        </div>
        {/* <Select
          onValueChange={handleSelectChange}
          defaultValue={defaultSelectValue}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={selectPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select> */}
      </div>
      <div className="grid-1-4">{children}</div>
    </div>
  );
};
interface StatCardProps {
  title?: string | number;
  description: string;
  icon:
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >
    | IconType;
  className?: string;
  avatarClassName?: string;
  iconSize?: number;
}

export const Stat_Card: React.FC<StatCardProps> = ({
  title,
  description,
  icon: Icon,
  className = "",
  avatarClassName = "",
  iconSize = 25,
}) => {
  return (
    <Card
      className={`w-full h-full flex items-center px-4 py-5 gap-5 ${className}`}
    >
      <Avatar className={`text-primary h-12 w-12 ${avatarClassName}`}>
        <AvatarFallback>
          <Icon
            height={iconSize}
            width={iconSize}
            size={iconSize}
            className="text-secondary dark:text-foreground"
          />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h3 className="dts5 font-semibold">{title}</h3>
        <span className="text-sm">{description}</span>
      </div>
    </Card>
  );
};
