import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExpensesField } from "@/lib/types";

export default function ExpenseTable({ data }: { data: ExpensesField[] }) {
  return (
    <Table className="w-11/12 mx-auto">
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead className="max-sm:hidden">Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell className="max-sm:hidden">{item.category}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-right">
              ₱{item.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
