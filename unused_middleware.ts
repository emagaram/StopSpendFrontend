// import { NextFetchEvent, NextRequest } from "next/server";

// const landingRoutes = ["/home", "/product", "/pricing"];
// // This? "/invite-confirmed", "/invite",

// const publicOnlyRoutes = ["/", "/login", "/signup", "/forgot-password"];

// export function middleware(request: NextRequest, event: NextFetchEvent) {
//   // const url = request.nextUrl;
//   // const isLoggedCookie = request.cookies.get("isLoggedIn");
//   // const isLoggedIn = isLoggedCookie ? JSON.parse(isLoggedCookie) : undefined;
//   // if (publicOnlyRoutes.includes(url.pathname) && isLoggedIn) {
//   //   return NextResponse.redirect(new URL("/my-setup", request.url));
//   // }
//   // if (landingRoutes.includes(url.pathname) && isLoggedIn) {
//   //   return NextResponse.rewrite(
//   //     new URL(`/private${url.pathname}`, request.url)
//   //   );
//   // }
// }
// export const config = {
//   // matcher: landingRoutes.concat(publicOnlyRoutes),
// };
