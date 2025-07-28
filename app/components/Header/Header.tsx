import AuthButtons from "./AuthButtons/AuthButtons";
import Link from "next/link";
import Image from "next/image";
import RulesButton from "./RulesButton/RulesButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-800 text-white sticky top-0 z-11">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Retro Against Humanity Logo"
          width={96}
          height={96}
          className="rounded p-2"
          priority
        />
      </Link>
      <p className="text-4xl font-bold">Retro Against Humanity</p>
      <div className="flex items-center space-x-8">
        <RulesButton />
        <AuthButtons />
      </div>
    </header>
  );
}
