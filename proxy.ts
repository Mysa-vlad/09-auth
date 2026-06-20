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

  const cookiesToSet: { name: string; value: string }[] = [];
  const cookiesToDelete: string[] = [];

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession();
      const newTokens = sessionResponse?.data;

      if (newTokens?.accessToken) {
        accessToken = newTokens.accessToken;
        cookiesToSet.push({ name: "accessToken", value: accessToken });

        if (newTokens.refreshToken) {
          refreshToken = newTokens.refreshToken;
          cookiesToSet.push({ name: "refreshToken", value: refreshToken });
        }
      } else {

        cookiesToDelete.push("refreshToken");
        refreshToken = undefined;
      }
    } catch (error) {
      console.error("Помилка під час оновлення сесії:", error);
    
      cookiesToDelete.push("refreshToken");
      refreshToken = undefined;
    }
  }


  const isAuthenticated = Boolean(accessToken);

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );


  let response = NextResponse.next();

  if (!isAuthenticated && isPrivateRoute) {

    response = NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (isAuthenticated && isPublicRoute) {
    response = NextResponse.redirect(new URL("/", request.url));
  }


  cookiesToSet.forEach(({ name, value }) => {
    response.cookies.set(name, value);
  });

  cookiesToDelete.forEach((name) => {
    response.cookies.delete(name);
  });

  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};