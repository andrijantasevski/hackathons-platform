import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/sign-up">Sign up</Link>
      <Link href="/sign-in">Sign in</Link>
    </main>
  );
}
