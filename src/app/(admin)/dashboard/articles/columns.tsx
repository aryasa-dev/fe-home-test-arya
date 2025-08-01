"use client";

import { TableRowActions } from "@/components/TableRowActions";
import { formattedDateAndTime } from "@/lib/utils";
import { Article } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const getArticleColumns = (onSuccessDelete: () => void): ColumnDef<Article>[] => [
  {
    accessorKey: "imageUrl",
    header: "Thumbnails",
    cell: ({ row }) => {
      return (
        <img
          src={row.getValue("imageUrl")}
          alt={row.getValue("title")}
          className="w-[60px] h-[60px] rounded-[6px] mx-auto"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <p className="max-w-sm mx-auto text-left">{row.getValue("title")}</p>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return <p>{formattedDateAndTime(row.getValue("createdAt"))}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      return (
        <TableRowActions
          linkToEdit={`articles/edit/${row.original.id}`}
          deletePath={`articles/${row.original.id}`}
          onSuccessDelete={onSuccessDelete}
        />
      );
    },
  },
];
