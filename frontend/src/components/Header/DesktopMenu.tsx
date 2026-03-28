import { Button } from "@/components/shadcnui/button";
import Link from "next/link";
import ThemeToggleButton from "../ThemeToggleButton";
import { NavItem } from "./navItems";

type DesktopMenuProps = {
  navItems: NavItem[];
  pathname: string;
};

const DesktopMenu = ({ navItems, pathname }: DesktopMenuProps) => {
  const linkClassName = (href: string) =>
    `text-sm transition-colors ${
      pathname === href ? "text-blue-500" : (
        "text-muted-foreground hover:text-foreground"
      )
    }`;

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="hidden md:block">
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={linkClassName(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden items-center gap-2 md:flex">
        <ThemeToggleButton />
        <Button
          asChild
          variant="outline">
          <Link href="/signin">Sign in</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </>
  );
};

export default DesktopMenu;
