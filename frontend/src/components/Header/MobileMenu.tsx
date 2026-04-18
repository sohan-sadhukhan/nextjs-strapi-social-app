import { Button } from "@/components/shadcnui/button";
import Link from "next/link";
import { NavItem } from "./navItems";

type MobileMenuProps = {
  navItems: NavItem[];
  pathname: string;
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({
  navItems,
  pathname,
  isOpen,
  onClose,
}: MobileMenuProps) => {
  return (
    <div
      id="mobile-navigation"
      className={`bg-background border-t transition-all duration-200 md:hidden ${
        isOpen ?
          "max-h-96 opacity-100"
        : "pointer-events-none max-h-0 opacity-0"
      }`}>
      <nav
        aria-label="Mobile navigation"
        className="mx-auto max-w-7xl px-4 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:bg-muted block rounded-md px-3 py-2 text-sm transition-colors ${
                  pathname === item.href ?
                    "bg-muted text-blue-500"
                  : "text-muted-foreground"
                }`}
                onClick={onClose}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            asChild
            variant="outline">
            <Link
              href="/signin"
              onClick={onClose}>
              Sign in
            </Link>
          </Button>
          <Button asChild>
            <Link
              href="/signup"
              onClick={onClose}>
              Sign up
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
