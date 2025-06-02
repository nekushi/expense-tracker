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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function BtnDeleteExpense({ id }: { id: string }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <IconTrash className="hover:bg-neutral-200 size-8 p-1 rounded" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete expense</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="hidden">
              <Label htmlFor="id">Expense id</Label>
              <Input id="id" name="id" defaultValue={id} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
