import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "./ButtonLoader";

type Props = {
  showDeleteDialog: boolean;
  setShowDeleteDialog: (open: boolean) => void;
  onAction?: () => void;
  title?: string;
  description?: string;
  button_action?: string;
  isLoading?: boolean;
};

export default function AlertAction({
  showDeleteDialog,
  setShowDeleteDialog,
  onAction,
  isLoading = false,
  button_action = "Delete",
  title = "Delete Articles",
  description = "Deleting this article is permanent and cannot be undone. All related content will be removed."
}: Props) {
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={onAction} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : button_action}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}