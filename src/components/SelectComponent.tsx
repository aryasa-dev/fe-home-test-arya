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

type SelectComponentProps = {
  data: {
    id: string;
    name: string;
  }[];
  label: string;
  value: string;
  setValue: (value: string) => void;
};

export default function SelectComponent({
  data,
  label,
  setValue,
  value,
}: SelectComponentProps) {
  return (
    <Select onValueChange={setValue} value={value}>
      <SelectTrigger className="bg-white !p-3 w-full">
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
