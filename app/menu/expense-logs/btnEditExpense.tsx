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

export default function BtnEditExpense({
  title,
  amount,
  category,
  description,
}: {
  title: string;
  amount: number;
  category: string;
  description: string;
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <IconEdit className="hover:bg-neutral-200 size-8 p-1 rounded" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Expense Title</Label>
              <Input id="title" name="title" defaultValue={title} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">Expense Amount</Label>
              <Input id="amount" name="amount" defaultValue={amount} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={category} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={description}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
