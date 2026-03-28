"use client";

import { Button } from "@/components/shadcnui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggleButton from "../ThemeToggleButton";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { navItems } from "./navItems";

type HeaderClientNavProps = {
  brand: React.ReactNode;
};

const HeaderClientNav = ({ brand }: HeaderClientNavProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Keep mobile menu state in sync with route changes.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previousState) => !previousState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {brand}

        <DesktopMenu
          navItems={navItems}
          pathname={pathname}
        />

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggleButton />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMobileMenu}>
            {isMobileMenuOpen ?
              <X className="size-5" />
            : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <MobileMenu
        navItems={navItems}
        pathname={pathname}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
};

export default HeaderClientNav;
