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

type Props = {};

export function Hero({}: Props) {
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
          <Select>
            <SelectTrigger className="bg-white !p-3 w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-x-0.5 px-2 bg-white rounded-[6px] col-span-2">
            <SearchIcon size={18} />
            <Input
              placeholder="Search articles"
              type="search"
              className="border-none outline-none focus-visible:ring-transparent focus-visible:border-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
