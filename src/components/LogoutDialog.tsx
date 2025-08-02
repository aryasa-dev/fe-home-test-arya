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

type LogoutDialogProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};

export function LogoutDialog({
  openDialog,
  setOpenDialog,
}: LogoutDialogProps) {
  const handleLogout = () => {
    Cookies.remove("ACCESS_TOKEN");
    Cookies.remove("USER_ROLE");
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
            <Button variant={"outline"} onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
