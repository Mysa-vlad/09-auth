import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  let refreshToken = cookieStore.get("refreshToken")?.value;

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession(); 
  const newTokens = sessionResponse.data;

      if (newTokens?.accessToken) {
        accessToken = newTokens.accessToken;


        response.cookies.set("accessToken", accessToken);
        
        if (newTokens.refreshToken) {
          refreshToken = newTokens.refreshToken;
          response.cookies.set("refreshToken", refreshToken);
        }
      }
    } catch (error) {
      console.error("Помилка під час оновлення сесії:", error);

    }
  }

  const isAuthenticated = Boolean(accessToken || refreshToken);

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );


  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};