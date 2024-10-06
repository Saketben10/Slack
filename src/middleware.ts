import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignin = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  if (!isSignin(request) && !convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  //TODO:  reidrect user to product if  authenticated
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
