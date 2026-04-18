import type { Route } from "next";

export type NavItem = {
  label: string;
  href: Route;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Notifications", href: "/notifications" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
];
