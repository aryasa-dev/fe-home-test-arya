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
import { cn } from "@/lib/utils";

type SelectComponentProps = {
  data: {
    id: string;
    name: string;
  }[];
  label: string;
  value: string;
  setValue: (value: string) => void;
  className?: string
};

export function SelectComponent({
  data,
  label,
  setValue,
  value,
  className
}: SelectComponentProps) {
  return (
    <Select onValueChange={setValue} value={value}>
      <SelectTrigger className={cn("bg-white !p-3 w-full rounded-[6px]", className)}>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {data
            .filter((item) => item.id !== "")
            .map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
