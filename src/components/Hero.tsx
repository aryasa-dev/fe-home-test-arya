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
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useApi } from "@/hooks/useApi";
import { CategoriesResponse } from "@/types";

type HeroProps = {
  categoryValue: string
  setCategoryValue: (value: string) => void
  searchValue: string
  setSearchValue: (value: string) => void
};

export function Hero({categoryValue,setCategoryValue,searchValue,setSearchValue}: HeroProps) {
  const {data,loading} = useApi<CategoriesResponse>({
    method: "GET",
    path: 'categories',
    auth: true,
  })
  return (
    <section className="min-h-[500px] bg-[url('/images/bg-hero.png')] bg-cover flex place-content-center items-center text-center">
      <div className="max-w-3xl mx-auto">
        <div className="text-white space-y-3">
          <b className="font-bold">Blog genzet</b>
          <h1 className="text-5xl font-medium">
            The Journal : Design Resources, Interviews, and Industry News
          </h1>
          <p className="text-2xl">Your daily dose of design insights!</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-10 max-w-xl mx-auto bg-blue-500 rounded-[12px] p-2.5">
          <Select onValueChange={setCategoryValue} value={categoryValue}>
            <SelectTrigger className="bg-white !p-3 w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {data?.data.filter(item => item.id !== '').map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-x-0.5 px-2 bg-white rounded-[6px] col-span-2">
            <SearchIcon size={18} />
            <Input
              placeholder="Search articles"
              type="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
              className="border-none outline-none focus-visible:ring-transparent focus-visible:border-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
