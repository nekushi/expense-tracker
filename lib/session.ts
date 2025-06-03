import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
// import { SessionPayload } from "@/app/lib/definitions";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: SessionPayload) {
export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(
  userId: string,
  username: string,
  email: string
) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day
  const session = await encrypt({ userId, username, email, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("username", username);
  cookieStore.set("email", email);

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day

  const cookieStore = await cookies();
  cookieStore.set("username", payload.username as string);
  cookieStore.set("email", payload.email as string);
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "strict",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("username");
  cookieStore.delete("email");
}
