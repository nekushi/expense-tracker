import { cookies } from "next/headers";
import { AppSidebar } from "./app-sidebar";
import { decrypt } from "@/lib/session";

export async function AppSidebarServer() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  const id = payload?.userId as string;
  const username = payload?.username as string;
  const email = payload?.email as string;

  return (
    <>
      <AppSidebar variant="inset" id={id} username={username} email={email} />
    </>
  );
}
