"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

import { IconEdit } from "@tabler/icons-react";

import { handleEditExpense } from "@/app/action";
import { useActionState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/app/generated/prisma";

const FormSchema = z.object({
  title: z.string().min(1, { message: "This input box can't be empty." }),
  amount: z.number().min(1, { message: "This input box can't be empty." }),
  description: z.string(),
});

export default function BtnEditExpense({
  id,
  title,
  amount,
  category,
  description,
  type,
}: {
  id: string;
  title: string;
  amount: number;
  category: Category;
  description: string;
  type: "expense" | "income";
}) {
  const [state, editAction, pending] = useActionState(
    handleEditExpense,
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
        <IconEdit className="hover:bg-neutral-200 size-8 p-1 rounded" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            action={editAction}
            // className="w-2/3 space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your expense here. Click save when you're done.
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
              <FormField
                name="title"
                render={() => (
                  <FormItem>
                    <FormLabel>Expense Title</FormLabel>
                    <FormControl>
                      <Input
                        name="title"
                        defaultValue={title}
                        placeholder="enter expense title"
                      />
                    </FormControl>
                    <FormDescription className="hidden cursor-default">
                      Add title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                render={() => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        name="amount"
                        defaultValue={amount}
                        placeholder="enter expense amount"
                      />
                    </FormControl>
                    <FormDescription className="hidden cursor-default">
                      Add amount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="category"
                render={() => (
                  <FormItem className="">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        name="category"
                        defaultValue={category}
                        placeholder="enter expense category"
                      />
                    </FormControl>
                    <FormDescription className="hidden cursor-default">
                      Add amount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                render={() => (
                  <FormItem>
                    <FormLabel>Notes or Details</FormLabel>
                    <FormControl>
                      {/* <Input
                        name="description"
                        defaultValue={description}
                        placeholder="enter expense description"
                      /> */}
                      <Textarea
                        name="description"
                        defaultValue={description}
                        placeholder="enter expense description"
                      />
                    </FormControl>
                    <FormDescription className="hidden cursor-default">
                      Add description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="type"
                render={() => (
                  <FormItem className="hidden">
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      {/* <Input
                        name="type"
                        defaultValue={type}
                        placeholder="enter expense type"
                      /> */}
                      <Textarea
                        name="type"
                        defaultValue={type}
                        placeholder="enter expense type"
                      />
                    </FormControl>
                    <FormDescription className="hidden cursor-default">
                      Add type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
