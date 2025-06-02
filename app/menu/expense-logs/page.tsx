import ClientExpenseLogs from "./clientLogs";
import prisma from "@/lib/prisma";

export default async function ExpenseLogs() {
  const data = await prisma.expenses.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return <ClientExpenseLogs data={data} />;
}
