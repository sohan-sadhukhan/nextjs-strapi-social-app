import ThemeProvider from "@/components/Providers/ThemeProvider";
import { ReactNode } from "react";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem={false}>
          <main className="mx-auto max-w-7xl">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
