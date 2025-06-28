import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold  mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-lg text-gray-300 mb-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="inline-block rounded bg-blue-500 px-6 py-3 text-white font-semibold hover:bg-blue-600 transition"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
