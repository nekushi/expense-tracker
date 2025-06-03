import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import BtnEditExpense from "./btnEditExpense";
import BtnDeleteExpense from "./btnDeleteExpense";

import prisma from "@/lib/prisma";
import { MergedExpensesIncome } from "@/lib/types";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export default async function ExpenseLogs() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  // const data = await prisma.expenses.findMany({
  //   where: {
  //     userId: payload?.userId as string,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // const lastData = data[0];

  // console.log(data);
  // console.log(lastData);

  const userId = payload?.userId as string;

  // const data: any[] = await prisma.$queryRaw`(
  //   SELECT id, title, amount, description, "createdAt", category
  //     FROM "Expenses"
  //       UNION ALL
  //   SELECT id, title, amount, description, "createdAt", category
  //     FROM "Income"
  //   ORDER BY "createdAt" DESC
  // )`;

  // const data: any[] = await prisma.$queryRaw`(
  //   SELECT id, title, amount, description, "createdAt", category
  //     FROM "Expenses" WHERE "userId" = ${userId}
  //       UNION ALL
  //   SELECT id, title, amount, description, "createdAt", category
  //     FROM "Income" WHERE "userId" = ${userId}
  //   ORDER BY "createdAt" DESC
  // )`;

  const data: any[] = await prisma.$queryRaw`
    (
      SELECT id, title, amount, description, "createdAt", category, 'expense' AS type
      FROM "Expenses"
      WHERE "userId" = ${userId}

      UNION ALL

      SELECT id, title, amount, description, "createdAt", category, 'income' AS type
      FROM "Income"
      WHERE "userId" = ${userId}
    )
    ORDER BY "createdAt" DESC
    `;

  console.log(data);

  // return <ClientExpenseLogs data={data} />;
  return (
    <Table className="w-11/12 mx-auto">
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right pr-5">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>₱{item.amount.toFixed(2)}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="flex justify-end space-x-2">
              <BtnEditExpense
                id={item.id}
                title={item.title}
                amount={item.amount}
                category={item.category}
                description={item.description}
                type={item.type}
              />
              <BtnDeleteExpense id={item.id} type={item.type} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
