import AuthButtons from "./AuthButtons/AuthButtons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white sticky top-0">
      <Link href="/" className="text-xl font-bold">
        Retro Against Humanity
      </Link>
      <AuthButtons />
    </header>
  );
}
