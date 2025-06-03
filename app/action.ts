"use server";

import prisma from "@/lib/prisma";
import { Category } from "./generated/prisma";

import { currentNow } from "@/lib/currentDate";
import { redirect } from "next/navigation";
import { createSession, decrypt, deleteSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function handleExpenseSubmit(prevState: any, formdata: FormData) {
  console.log(`Attempting to add expense row.`);

  const name = formdata.get("title") as string;
  const amount = Math.round(Number(formdata.get("amount")) * 100) / 100;
  const category = formdata.get("category") as Category;
  const description = formdata.get("description") as string;

  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  const createExpense = await prisma.expenses.create({
    data: {
      title: name,
      amount,
      category,
      description,
      createdAt: currentNow,
      updatedAt: currentNow,
      user: {
        connect: { id: payload?.userId as string },
      },
    },
  });

  console.log(createExpense);

  redirect("/menu/new-expense");
}

export async function handleEditExpense(prevState: any, formdata: FormData) {
  console.log(`Attempting to edit expense data row.`);

  const id = formdata.get("id") as string;
  const name = formdata.get("title") as string;
  const amount = Math.round(Number(formdata.get("amount")) * 100) / 100;
  const category = formdata.get("category") as Category;
  const description = formdata.get("description") as string;
  const type = formdata.get("type") as string;

  if (!id || !type) {
    console.error("Missing ID or type");
    return;
  }

  console.log(name, amount, category, description);

  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  try {
    if (type === "expense") {
      const editExpense = await prisma.expenses.update({
        where: { id },
        data: {
          title: name,
          amount,
          category,
          description,
          updatedAt: currentNow,
          user: {
            connect: { id: payload?.userId as string },
          },
        },
      });

      console.log(editExpense);
    } else if (type === "income") {
      const editExpense = await prisma.income.update({
        where: { id },
        data: {
          title: name,
          amount,
          category,
          description,
          updatedAt: currentNow,
          user: {
            connect: { id: payload?.userId as string },
          },
        },
      });

      console.log(editExpense);
    } else {
      throw new Error("Unknown type");
    }
    console.log(`Edited ${type} with ID: ${id}`);
  } catch (error) {
    console.error("Edit failed:", error);
  }

  redirect("/menu/expense-logs");
}

export async function handleDeleteExpense(prevState: any, formdata: FormData) {
  const id = formdata.get("id") as string;
  const type = formdata.get("type") as string;

  if (!id || !type) {
    console.error("Missing ID or type");
    return;
  }

  try {
    if (type === "expense") {
      await prisma.expenses.delete({ where: { id } });
    } else if (type === "income") {
      await prisma.income.delete({ where: { id } });
    } else {
      throw new Error("Unknown type");
    }
    console.log(`Deleted ${type} with ID: ${id}`);
  } catch (error) {
    console.error("Delete failed:", error);
  }

  redirect("/menu/expense-logs");
}

export async function actionAddMoney(prevState: any, formdata: FormData) {
  console.log(`Attempting to add money data row.`);

  const name = formdata.get("title") as string;
  const amount = Math.round(Number(formdata.get("amount")) * 100) / 100;
  const description = formdata.get("description") as string;

  const url = formdata.get("url");

  console.log(name, amount, description);

  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  const createIncome = await prisma.income.create({
    data: {
      title: name,
      amount,
      category: "others",
      description,
      createdAt: currentNow,
      updatedAt: currentNow,
      user: {
        connect: { id: payload?.userId as string },
      },
    },
  });

  console.log(createIncome);

  redirect(`${url}`);
}

export async function createUser(prevState: any, formdata: FormData) {
  console.log(`Attempting to add new user.`);

  const firstName = formdata.get("first-name") as string;
  const lastName = formdata.get("last-name") as string;
  const email = formdata.get("email") as string;
  const username = formdata.get("username") as string;
  const password = formdata.get("password") as string;

  console.log(firstName, lastName, email, username, password);

  const createUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      username,
      password,
      contactNo: "",
      createdAt: currentNow,
      updatedAt: currentNow,
    },
  });

  console.log(createUser);
  redirect("/");
}

export async function login(prevState: any, formdata: FormData) {
  console.log(`Attempting to login user.`);

  const username = formdata.get("username") as string;
  const password = formdata.get("password") as string;

  console.log(username, password);

  const findUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!findUser) {
    console.log(`No user found.`);
  }

  if (password === findUser?.password) {
    await createSession(findUser.id, findUser.username, findUser.email);
    redirect("/menu/new-expense");
  }
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
