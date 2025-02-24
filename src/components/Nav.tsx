import Link from "next/link";

export default async function Nav() {
  return (
    <nav className="flex space-x-3 justify-center pt-3">
      <Link href="/" className="btn btn-ghost btn-neutral">Home</Link>
      <Link href="/sign-in" className="btn btn-ghost btn-neutral">Sign In</Link>
      <Link href="/sign-up" className="btn btn-ghost btn-neutral">Sign Up</Link>
      <Link href="/dashboard" className="btn btn-ghost btn-neutral">Dashboard</Link>
    </nav>
  );
}
