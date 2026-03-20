import Link from "next/link";
import ThemeToggleButton from "../ThemeToggleButton";

const Header = () => {
  return (
    <header
      className="fixed right-0 left-0 z-50 border-b shadow backdrop-blur-2xl"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            Social App
          </h1>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href={"/"}>Home</Link>
          <Link href={"/profile"}>Profile</Link>

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
