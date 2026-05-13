import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { extractTokensFromAuthPayload } from "@/lib/auth-tokens";
import { clearTokens, setTokens } from "@/lib/session";

const REMOTE_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!REMOTE_API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
}

const normalizeUrl = (path: string) => {
  const base = REMOTE_API_URL.replace(/\/+$/, "");
  const suffix = path.replace(/^\/+/g, "");
  return `${base}/${suffix}`;
};

const createRemoteHeaders = async (request: NextRequest) => {
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("origin");
  headers.delete("referer");
  headers.delete("cookie");

  const clientAuthorization = request.headers.get("authorization");
  if (clientAuthorization) {
    headers.set("authorization", clientAuthorization);
  } else {
    const localCookies = await cookies();
    const accessToken = localCookies.get("access-token")?.value;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
  }

  return headers;
};

const proxyRequest = async (
  request: NextRequest,
  pathSegments: string[] = [],
) => {
  const path = pathSegments.join("/") || "";
  const targetUrl = normalizeUrl(path);
  const headers = await createRemoteHeaders(request);

  const body = ["GET", "HEAD"].includes(request.method)
    ? undefined
    : await request.text();

  try {
    const upstreamResponse = await fetch(targetUrl + request.nextUrl.search, {
      method: request.method,
      headers,
      body,
      redirect: "manual",
    });

    const responseHeaders = new Headers(upstreamResponse.headers);
    responseHeaders.delete("access-control-allow-origin");
    responseHeaders.delete("access-control-allow-credentials");

    const responseBody = await upstreamResponse.arrayBuffer();
    const response = new Response(responseBody, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });

    if (path === "auth/login" && upstreamResponse.ok) {
      try {
        const data = JSON.parse(new TextDecoder().decode(responseBody));
        const tokens = extractTokensFromAuthPayload(data);
        if (tokens?.accessToken) {
          await setTokens(tokens.accessToken, tokens.refreshToken ?? null);
        }
      } catch {
        // Ignore parse failures; preserve upstream response.
      }
    }

    if (path === "auth/logout") {
      await clearTokens();
    }

    return response;
  } catch (error) {
    console.error("Proxy fetch failed", { targetUrl, error });
    return new Response(
      JSON.stringify({
        error: "Proxy fetch failed",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 502,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function OPTIONS(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}
