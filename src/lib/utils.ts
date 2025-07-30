import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formattedDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export function getPagination(current: number, total: number): (number | "...")[] {
  const delta = 2;
  const range: number[] = [];
  const rangeWithDots: (number | "...")[] = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || 
      i === total || 
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  let prev: number | null = null;
  for (const page of range) {
    if (prev !== null) {
      if (page - prev === 2) {
        rangeWithDots.push(prev + 1);
      } else if (page - prev > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(page);
    prev = page;
  }

  return rangeWithDots;
}


