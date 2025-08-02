'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import { useState } from "react";
import { ButtonLoader } from "./ButtonLoader";

type LogoutDialogProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};

export function LogoutDialog({
  openDialog,
  setOpenDialog,
}: LogoutDialogProps) {
  const [logoutLoading, setLogoutLoading] = useState(false)
  const handleLogout = () => {
    Cookies.remove("ACCESS_TOKEN");
    Cookies.remove("USER_ROLE");
    setLogoutLoading(true)
    window.location.href = "/login";
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>Are you sure want to logout?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center gap-3 mt-4">
            <Button variant={"outline"} onClick={() => setOpenDialog(false)} disabled={logoutLoading}>
              Cancel
            </Button>
            <Button onClick={handleLogout} disabled={logoutLoading}>{logoutLoading ? <ButtonLoader /> : "Logout"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
