import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string
  className?: string
};

export default function SearchInput({ value, setValue, placeholder = "Search articles", className }: SearchInputProps) {
  return (
    <div className={cn("flex items-center gap-x-0.5 px-2 bg-white rounded-[6px] col-span-2", className)}>
      <SearchIcon size={18} />
      <Input
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="border-none outline-none focus-visible:ring-transparent focus-visible:border-none shadow-none w-full"
      />
    </div>
  );
}
