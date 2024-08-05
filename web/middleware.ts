import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "next-runtime-env";
import createMiddleware from "next-intl/middleware";

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const { pathname } = req.nextUrl;
  const session = await getToken({ req, secret: env("NEXTAUTH_SECRET") });
  const url = req.nextUrl.clone();

  

  return NextResponse.next();
};

export const config = {
  matcher: [],
};
