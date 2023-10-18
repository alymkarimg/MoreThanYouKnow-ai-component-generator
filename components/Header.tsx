import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-2 border-b pb-3 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <h1 className="sm:text-2xl text-1xl font-normal ml-2 tracking-tight">
          ChatGPT AI <span className="text-green-400">component generator</span>
        </h1>
      </Link>
      <h1>MoreThanYouKnow Ltd</h1>
    </header>
  );
}
