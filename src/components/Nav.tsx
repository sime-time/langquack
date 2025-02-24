import { auth } from "@/utils/auth";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Nav() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const signOutAction = async () => {
    "use server";
    await auth.api.signOut({
      headers: await headers()
    });
    redirect("/")
  };

  return (
    <nav className="flex space-x-3 justify-center pt-3">
      <Link href="/" className="btn btn-ghost btn-neutral">Home</Link>
      {session?.user ? (
        <>
          <Link href="/dashboard" className="btn btn-ghost btn-neutral">Dashboard</Link>
          <form action={signOutAction}>
            <button type="submit" className="btn btn-ghost btn-error">Sign Out</button>
          </form>
        </>
      ) : (
        <Link href="/sign-in" className="btn btn-ghost btn-neutral">Sign In</Link>
      )}
    </nav>
  );
}
