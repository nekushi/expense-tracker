"use server";

import { currentNow } from "@/lib/currentDate";
import prisma from "@/lib/prisma";
import { Category } from "./generated/prisma";

export async function handleExpenseSubmit(prevState: any, formdata: FormData) {
  console.log(`Attempting to add expense row.`);

  const name = formdata.get("title") as string;
  const amount = Math.round(Number(formdata.get("amount")) * 100) / 100;
  const category = formdata.get("category") as Category;
  const description = formdata.get("description") as string;

  const createExpense = await prisma.expenses.create({
    data: {
      title: name,
      amount,
      category,
      description,
      date: currentNow,
    },
  });

  console.log(createExpense);
}

export async function handleEditExpense(prevState: any, formdata: FormData) {
  console.log(`Attempting to edit expense data row.`);

  const id = formdata.get("id") as string;
  const name = formdata.get("title") as string;
  const amount = Math.round(Number(formdata.get("amount")) * 100) / 100;
  const category = formdata.get("category") as Category;
  const description = formdata.get("description") as string;

  console.log(name, amount, category, description);

  const editExpense = await prisma.expenses.update({
    where: {
      id: id,
    },
    data: {
      id,
      title: name,
      amount,
      category,
      description,
      date: currentNow,
    },
  });

  console.log(editExpense);
}

export async function handleDeleteExpense(prevState: any, formdata: FormData) {
  console.log(`Attempting to delete expense data row.`);

  const id = formdata.get("id") as string;

  await prisma.expenses.delete({
    where: {
      id,
    },
  });

  console.log(id);
}
