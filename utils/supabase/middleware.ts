import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user?.id)
      .single();

    const path = request.nextUrl.pathname;

    // If user is not authenticated and trying to access protected route
    if (path.startsWith("/dashboard") && (!user || error)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Role-based restrictions
    if (path.startsWith("/dashboard/citizen") && profile?.role !== "citizen") {
      return NextResponse.redirect(new URL(`/dashboard/${profile?.role}`, request.url));
    }

    if (path.startsWith("/dashboard/ngo") && profile?.role !== "ngo") {
      return NextResponse.redirect(new URL(`/dashboard/${profile?.role}`, request.url));
    }

    if (path.startsWith("/dashboard/funder") && profile?.role !== "funder") {
      return NextResponse.redirect(new URL(`/dashboard/${profile?.role}`, request.url));
    }

    if (path === "/" && user && profile?.role) {
      return NextResponse.redirect(new URL(`/dashboard/${profile.role}`, request.url));
    }

    return response;
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
  ],
};
