"use client";

import { TableRowActions } from "@/components/TableRowActions";
import { formattedDateAndTime } from "@/lib/utils";
import { Category } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const getCategoryColumns = (onSuccessDelete: () => void): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
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
          linkToEdit={`category/edit/${row.original.id}`}
          deletePath={`categories/${row.original.id}`}
          onSuccessDelete={onSuccessDelete}
          withPreview={false}
        />
      );
    },
  },
];
