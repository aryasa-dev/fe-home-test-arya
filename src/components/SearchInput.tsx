import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

type SearchInputProps = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string
};

export default function SearchInput({ value, setValue, placeholder = "Search articles" }: SearchInputProps) {
  return (
    <div className="flex items-center gap-x-0.5 px-2 bg-white rounded-[6px] col-span-2">
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
