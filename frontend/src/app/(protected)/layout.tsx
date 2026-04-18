import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import "../globals.css";

type ProtectedLayoutProps = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: Readonly<ProtectedLayoutProps>) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default ProtectedLayout;
