import { Loader2Icon } from "lucide-react";
import React from "react";

type Props = {};

export function ButtonLoader({}: Props) {
  return (
    <span className="flex items-center gap-x-1">
      <Loader2Icon className="animate-spin" /> Loading
    </span>
  );
}
