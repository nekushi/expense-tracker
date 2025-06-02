import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IconEdit, IconTrash } from "@tabler/icons-react";
import BtnEditExpense from "./btnEditExpense";
import BtnDeleteExpense from "./btnDeleteExpense";

export default function ClientExpenseLogs({ data }: { data: any[] }) {
  return (
    <Table className="w-11/12 mx-auto">
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead className="max-sm:hidden">Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="text-right pr-5">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell className="max-sm:hidden">{item.category}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>₱{item.amount.toFixed(2)}</TableCell>
            <TableCell className="flex justify-end space-x-2">
              <BtnEditExpense
                title={item.title}
                amount={item.amount}
                category={item.category}
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
