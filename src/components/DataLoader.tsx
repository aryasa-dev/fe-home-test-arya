import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import React from "react";

type Props = {
    className?: string
};

export function DataLoader({className}: Props) {
  return <Loader2Icon className={cn("animate-spin mx-auto text-slate-900", className)} />;
}