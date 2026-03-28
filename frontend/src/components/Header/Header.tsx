import Link from "next/link";
import HeaderClientNav from "./HeaderClientNav";

const Header = () => {
  return (
    <header className="supports-backdrop-filter:bg-background/60 bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
      <HeaderClientNav
        brand={
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
            aria-label="Social App home">
            Social App
          </Link>
        }
      />
    </header>
  );
};

export default Header;
