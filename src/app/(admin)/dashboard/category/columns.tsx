"use client";

import { TableRowActions } from "@/components/TableRowActions";
import { formattedDateAndTime } from "@/lib/utils";
import { Category } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const getCategoryColumns = (
  onSuccessDelete: () => void,
  onEditAction: (id: string) => void
): ColumnDef<Category>[] => [
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
          deletePath={`categories/${row.original.id}`}
          onSuccessDelete={onSuccessDelete}
          onEditAction={() => onEditAction(row.original.id)}
          alertTitle="Category"
          alertDescription={`Delete category "${row.getValue("name")}"? This will remove it from master data permanently.`}
        />
      );
    },
  },
];
