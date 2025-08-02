import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type FormDialogProps = {
  //   triggerText: string;
  title: string;
  children: ReactNode;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};

export function FormDialog({
  openDialog,
  setOpenDialog,
  title,
  children,
}: FormDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
