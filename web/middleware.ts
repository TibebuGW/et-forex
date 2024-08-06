import { NextResponse } from "next/server";

export const middleware = async (): Promise<NextResponse> => {

  

  return NextResponse.next();
};

export const config = {
  matcher: [],
};
