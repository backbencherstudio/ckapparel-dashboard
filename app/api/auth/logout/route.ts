import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { clearTokens } from "@/lib/session";

const REMOTE_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!REMOTE_API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
}

const logoutUrl = REMOTE_API_URL.replace(/\/+$/, "") + "/auth/logout";

const getAuthorizationHeader = async (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");
  if (authHeader) return authHeader;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access-token")?.value;
  return accessToken ? `Bearer ${accessToken}` : undefined;
};

export async function POST(request: NextRequest) {
  const authorization = await getAuthorizationHeader(request);

  const upstreamResponse = await fetch(logoutUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authorization ? { authorization } : {}),
    },
  });

  if (upstreamResponse.ok) {
    await clearTokens();
  }

  const responseBody = await upstreamResponse.text();
  return new NextResponse(responseBody, {
    status: upstreamResponse.status,
    headers: {
      "content-type":
        upstreamResponse.headers.get("content-type") ?? "application/json",
    },
  });
}
