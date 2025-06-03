import prisma from "@/lib/prisma";
import ClientNewExpense from "./clientNewExpense";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export default async function ServerNewExpense() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  const data = await prisma.expenses.findMany({
    where: {
      userId: payload?.userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const lastData = data[0];

  console.log(data);
  console.log(lastData);

  return <ClientNewExpense data={data} lastData={lastData} />;
}
