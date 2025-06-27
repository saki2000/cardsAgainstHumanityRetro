import AuthButtons from "../AuthButtons/AuthButtons";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Retro Agains Humanity</h1>
      <AuthButtons />
    </header>
  );
}
