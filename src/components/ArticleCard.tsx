import { formattedDate } from "@/lib/utils";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ArticleCardProps = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: Category;
  createdAt: string;
};

export function ArticleCard({
  category,
  content,
  createdAt,
  imageUrl,
  title,
  id,
}: ArticleCardProps) {
  return (
    <div>
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={400}
        className="w-full h-60 object-cover rounded-[12px]"
      />

      <div className="mt-4 space-y-2">
        <p className="text-slate-600 text-sm">{formattedDate(createdAt)}</p>
        <Link href={`/articles/${id}`}>
          <h4 className="text-slate-900 font-semibold text-lg">{title}</h4>
        </Link>
        <div
          className="line-clamp-3 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-blue-200 text-blue-900 text-sm px-3 py-1 rounded-full">
            {category.name}
          </span>
        </div>
      </div>
    </div>
  );
}
