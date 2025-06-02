"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { handleDeleteExpense } from "@/app/action";
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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { IconTrash } from "@tabler/icons-react";

import { useActionState } from "react";

const FormSchema = z.object({
  title: z.string().min(1, { message: "This input box can't be empty." }),
  amount: z.number().min(1, { message: "This input box can't be empty." }),
  description: z.string(),
});

export default function BtnDeleteExpense({ id }: { id: string }) {
  const [state, deleteAction, pending] = useActionState(
    handleDeleteExpense,
    undefined
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      amount: 0,
      description: "",
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconTrash className="hover:bg-neutral-200 size-8 p-1 rounded" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form action={deleteAction}>
            <DialogHeader>
              <DialogTitle>Delete expense</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 mt-6">
              <FormField
                name="id"
                render={() => (
                  <FormItem className="hidden">
                    <FormLabel>Expense ID</FormLabel>
                    <FormControl>
                      <Input
                        name="id"
                        defaultValue={id}
                        placeholder="enter expense id"
                      />
                    </FormControl>
                    <FormDescription className="hidden cursor-default">
                      Add id.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Delete</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

/*

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

*/
