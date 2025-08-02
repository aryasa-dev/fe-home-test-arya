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
import { CategoriesResponse, Category } from "@/types";

type HeroProps = {
  categoryValue: string
  setCategoryValue: (value: string) => void
  searchValue: string
  setSearchValue: (value: string) => void
  data: Category[]
};

export function Hero({categoryValue,setCategoryValue,searchValue,setSearchValue, data}: HeroProps) {
  
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

        <div className="flex md:grid grid-cols-3 gap-2 mt-10 max-w-xl mx-auto bg-blue-500 rounded-[12px] p-2.5">
          <Select onValueChange={setCategoryValue} value={categoryValue}>
            <SelectTrigger className="bg-white !p-3 w-[40%] md:w-full rounded-[6px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {data.filter(item => item.id !== '').map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-x-0.5 px-2 bg-white rounded-[6px] w-[60%] md:w-auto md:col-span-2">
            <SearchIcon size={18} />
            <Input
              placeholder="Search articles"
              type="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
              className="border-none outline-none focus-visible:ring-transparent focus-visible:border-none text-sm placeholder:text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
