import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";

// Import the authOptions object you exported from the route file.
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  // Pass the authOptions object directly to getServerSession.
  const session = await getServerSession(authOptions);

  if (!session) {
    // If no session exists, redirect the user to the home page.
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="p-10 bg-white rounded-xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Protected Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome, {session.user?.email}!
        </p>
        <p className="mt-2 text-gray-500">
          You can only see this page if you are signed in.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-indigo-600 text-white py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
