"use client";

import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useActionState } from "react";
import { handleExpenseSubmit } from "@/app/action";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ExpenseTable from "./expenseTable";

const categories = [
  {
    value: "food",
    label: "Food",
  },
  {
    value: "transportation",
    label: "Transportation",
  },
  {
    value: "utilities",
    label: "Utilities",
  },
  {
    value: "entertainment",
    label: "Entertainment",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "shopping",
    label: "Shopping",
  },
  {
    value: "savings",
    label: "Savings",
  },
  {
    value: "others",
    label: "Others",
  },
];

const FormSchema = z.object({
  title: z.string().min(1, { message: "This input box can't be empty." }),
  amount: z.number().min(1, { message: "This input box can't be empty." }),
  category: z.string().min(1, { message: "This input box can't be empty." }),
  description: z.string(),
});

export default function ClientNewExpense({
  data,
  lastData,
}: {
  data: any[];
  lastData: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [state, expenseAction, pending] = useActionState(
    handleExpenseSubmit,
    undefined
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Track New Expenses
          </CardTitle>
          {/* <CardDescription className="opacity-0 cursor-default">
            Add Expense
          </CardDescription> */}
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form
              action={expenseAction}
              className="w-full space-y-6"
              // className="w-2/3 space-y-6"
            >
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={() => (
                    <FormItem>
                      <FormLabel>Expense Title</FormLabel>
                      <FormControl>
                        <Input
                          name="title"
                          placeholder="enter expense title"
                          required
                        />
                      </FormControl>
                      <FormDescription className="hidden cursor-default">
                        Enter a name for your input.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={() => (
                    <FormItem>
                      <FormLabel>Amount (₱) or Amount (PHP)</FormLabel>
                      <FormControl>
                        <Input
                          name="amount"
                          placeholder="enter an amount"
                          required
                        />
                      </FormControl>
                      <FormDescription className="hidden cursor-default">
                        Enter an amount for your expense.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={() => (
                    <FormItem>
                      <FormLabel>Expense Category</FormLabel>
                      <FormControl className="border-none">
                        <div key={3}>
                          <Input
                            name="category"
                            className="hidden"
                            value={value}
                            readOnly
                            placeholder="enter an amount"
                            required
                          />
                          {/* <ComboboxDemo /> */}
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={`w-[322px] max-sm:w-full justify-between border border-neutral-300 text-neutral-400 font-normal ${
                                  value !== "" && "text-black"
                                }`}
                              >
                                {value
                                  ? categories.find(
                                      (category) => category.value === value
                                    )?.label
                                  : "Select category..."}
                                <ChevronsUpDown className="" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[322px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search category..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    No category found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {categories.map((category) => (
                                      <CommandItem
                                        key={category.value}
                                        value={category.value}
                                        onSelect={(currentValue) => {
                                          setValue(
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          );
                                          setOpen(false);
                                        }}
                                      >
                                        {category.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            value === category.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormControl>
                      <FormDescription className="hidden cursor-default">
                        Choose the category of your expense.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={() => (
                    <FormItem>
                      <FormLabel>Notes or Details</FormLabel>
                      <FormControl>
                        <Textarea
                          name="description"
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
              </>
              {/* title, amount, category, description */}
              <Button type="submit">Add Expense</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {/* <p>Card Footer</p> */}
          <div>
            <p>
              Last added:{" "}
              {lastData.date.toISOString().split("T")[0].split("-")[1]}-
              {lastData.date.toISOString().split("T")[0].split("-")[2]}-
              {lastData.date.toISOString().split("T")[0].split("-")[0]},{" "}
              {String(
                lastData.date
                  .toISOString()
                  .split("T")[1]
                  .split(".")[0]
                  .split(":")[0] % 12
              ).padStart(2, "0")}
              :
              {
                lastData.date
                  .toISOString()
                  .split("T")[1]
                  .split(".")[0]
                  .split(":")[1]
              }{" "}
              {lastData.date
                .toISOString()
                .split("T")[1]
                .split(".")[0]
                .split(":")[0] >= 12
                ? "P.M."
                : "A.M."}
            </p>
            <p>Expense title: {lastData.title}</p>
            <p>Expense amount: ₱{lastData.amount.toFixed(2)}</p>
            <p>Expense category: {lastData.category}</p>
            <p>Expense description: {lastData.description}</p>
          </div>
        </CardFooter>
      </Card>
      {/* <ExpenseTable data={data} /> */}
    </>
  );
}

// Currently it says Card Footer. You could:
// ✅ Show summary: Total today: ₱520
// 📅 Show latest date: Last added: May 31, 2:30 PM
// 🧠 Add a tip: "Track small spends daily to avoid end-of-month surprises."

// Financial tips. Apply in random
// "Track every peso — what gets measured gets managed."
// "Spend less than you earn, always."
// "Budgeting isn’t restriction; it’s freedom in disguise."
// "Buy what you need, question what you want."
// "Cook meals, not regrets."
// "Avoid debt like a toxic ex — tempting but dangerous."
// "If you can’t afford to buy it twice, you can’t afford it yet."
// "Savings first, spending second."
// "Time grows money — start investing early, even with a little."
// "Your future self will thank you for every peso you saved today."
