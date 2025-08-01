"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useApi } from "@/hooks/useApi";
import AlertAction from "./AlertAction";

type TableRowActionsProps = {
  linkToEdit: string;
  deletePath: string;
  onSuccessDelete?: () => void
  withPreview?: boolean
};

export function TableRowActions({
  linkToEdit,
  deletePath,
  onSuccessDelete,
  withPreview = true
}: TableRowActionsProps) {
  const [openAlert, setOpenAlert] = useState(false);
  const { refetch: deleteItem, loading: deleteLoading } = useApi(
    {
      method: "DELETE",
      path: deletePath,
      auth: true,
    },
    {
      manual: true,
      onSuccess: () => {
        alert("Item deleted successfully")
        onSuccessDelete?.()
      },
      onError: () => alert("Failed to delete item"),
    }
  );

  const handleDelete = () => {
    deleteItem();
    setOpenAlert(false);
  };
  return (
    <>
      <div className="flex items-center justify-center">
        {withPreview && <Button variant={"link"}>Preview</Button>}
        <Link href={linkToEdit}>
          <Button variant={"link"}>Edit</Button>
        </Link>
        <Button variant={"link"} className="text-red-500" onClick={() => setOpenAlert(true)}>
          Delete
        </Button>
      </div>
      <AlertAction
        setShowDeleteDialog={setOpenAlert}
        showDeleteDialog={openAlert}
        isLoading={deleteLoading}
        onAction={handleDelete}
      />
    </>
  );
}
