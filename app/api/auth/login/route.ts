import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import { setTokens } from "@/lib/session";

const REMOTE_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!REMOTE_API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
}

const loginUrl = REMOTE_API_URL.replace(/\/+$/, "") + "/auth/login";

export async function POST(request: NextRequest) {
  const requestBody = await request.text();

  const upstreamResponse = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: requestBody,
  });

  const responseBody = await upstreamResponse.text();

  if (upstreamResponse.ok) {
    try {
      const data = JSON.parse(responseBody);
      const tokens = extractTokensFromAuthPayload(data);
      if (tokens?.accessToken) {
        await setTokens(tokens.accessToken, tokens.refreshToken ?? null);
      }
    } catch {
      // Ignore token extraction failures.
    }
  }

  const response = new NextResponse(responseBody, {
    status: upstreamResponse.status,
    headers: {
      "content-type":
        upstreamResponse.headers.get("content-type") ?? "application/json",
    },
  });

  return response;
}
