"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

type PreviewDialogProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  user: string;
  title: string;
  imageUrl?: string;
  content: string;
};

export function PreviewDialog({
  openDialog,
  setOpenDialog,
  user,
  title,
  imageUrl,
  content,
}: PreviewDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogHeader>
        <DialogTitle className="invisible">Preview</DialogTitle>
      </DialogHeader>
      
      <DialogContent className="sm:max-w-[425px] md:max-w-[80%] md:py-20 md:px-10">
        <div>
          <div className="flex items-center justify-center gap-x-1.5 text-slate-600 font-medium text-sm">
            {/* <p>{formattedDate(createdAt)}</p> */}
            <p>Just now</p>
            <div className="w-1 h-1 bg-slate-600 rounded-full" />
            <p>Created by {user}</p>
          </div>

          <h2 className="text-3xl font-semibold text-slate-900 mt-4 max-w-2xl text-center mx-auto mb-5">
            {title}
          </h2>

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={400}
              className="w-full h-auto max-h-[480px] my-10 rounded-lg object-cover"
            />
          ) : (
            <Skeleton className="w-full h-[350px]" />
          )}

          <data dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        {/* <DialogFooter>
          <div className="flex items-center gap-3 mt-4">
            <Button>Cancel</Button>
          </div>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
