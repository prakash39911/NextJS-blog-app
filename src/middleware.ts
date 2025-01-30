import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/allblogs"];
const loginRegisterRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;
  const isParticularBlog = pathname.startsWith("/blog");
  const isCreatePostRoute = pathname.startsWith("/createpost");
  const isRegisterSuccessRoutes = pathname.startsWith("/register");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdmin = token?.role === "ADMIN";

  if (isParticularBlog || publicRoutes.includes(pathname) || isAdmin) {
    return NextResponse.next();
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (isLoggedIn && isRegisterSuccessRoutes) {
    return NextResponse.redirect(new URL("/allblogs", req.nextUrl.origin));
  }

  if (loginRegisterRoutes.includes(pathname)) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/allblogs", req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (isCreatePostRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (!isLoggedIn && !publicRoutes.includes(pathname) && !isParticularBlog) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
