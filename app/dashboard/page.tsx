import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Correct: Import from lib/auth.ts
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // If the user is not logged in, redirect them to the sign-in page.
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4">
        Welcome, {session.user?.name ?? session.user?.email}!
      </p>
      <p>This is a protected page.</p>
      {/* You can add your dashboard components here */}
    </main>
  );
}
