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

export default async function ExpenseLogs() {
  const data: any[] = await prisma.$queryRaw`(
    SELECT id, title, amount, description, "createdAt"
      FROM "Expenses"
        UNION ALL
    SELECT id, title, amount, description, "createdAt"
      FROM "Income"
    ORDER BY "createdAt" DESC
  )

`;

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
                description={item.description}
              />
              <BtnDeleteExpense id={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
