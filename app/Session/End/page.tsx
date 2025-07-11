import Link from "next/link";

export default function EndSessionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-8xl font-bold">Thank You for Playing!</h1>
      <p className="text-8xl">Go Away Now.</p>
      <Link
        href="/"
        className="inline-block rounded bg-blue-500 px-6 py-3 text-white font-semibold hover:bg-blue-600 transition mt-30"
      >
        Return Home
      </Link>
    </div>
  );
}
