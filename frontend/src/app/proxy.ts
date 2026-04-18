import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

//   Middleware proxy function to protect authenticated routes
export const proxy = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("session")?.value;

  if (!jwt) {
    redirect("/signin");
  }
  // if (!jwt) {
  // 	return NextResponse.redirect(new URL("/signin", request.url));
  // }

  return NextResponse.next();
};

export const config = {
  matcher: "/dashboard",
};
