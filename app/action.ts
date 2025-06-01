"use server";

import { currentNow } from "@/lib/currentDate";
import prisma from "@/lib/prisma";
import { Category } from "./generated/prisma";

export async function handleExpenseSubmit(
  prevState: any,
  formdata: FormData
): Promise<any> {
  console.log(`Attempting to add expense row.`);

  const name = formdata.get("title") as string;
  const amount = Math.round(Number(formdata.get("amount")) * 100) / 100;
  const category = formdata.get("category") as Category;
  const description = formdata.get("description") as string;

  // console.log(name);
  // console.log(amount);
  // console.log(category);
  // console.log(description);

  // const createExpense = await prisma.expenses.create({
  //   data: {
  //     title: name,
  //     amount,
  //     category,
  //     description,
  //     date: currentNow,
  //   },
  // });

  const last = await prisma.expenses.findMany({
    orderBy: {
      date: "desc",
    },
  });

  // const first = await prisma.expenses.findFirst();
  // console.log(createExpense);
  // console.log(first);
  console.log(last[0]);
}
