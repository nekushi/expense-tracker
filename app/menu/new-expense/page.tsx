import prisma from "@/lib/prisma";
import ClientNewExpense from "./clientNewExpense";

export default async function ServerNewExpense() {
  const data = await prisma.expenses.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const lastData = data[0];

  console.log(data);
  console.log(lastData);

  return <ClientNewExpense data={data} lastData={lastData} />;
}
