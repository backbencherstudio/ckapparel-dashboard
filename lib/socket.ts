"use client";

import { io, Socket } from "socket.io-client";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ??
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ??
  "https://limitless.pixelstack.cloud";
const WS_NAMESPACE = process.env.NEXT_PUBLIC_WS_NAMESPACE ?? "/ws";
const WS_PATH = process.env.NEXT_PUBLIC_WS_PATH ?? "/socket.io";

let socket: Socket | null = null;

export const getSocket = async (): Promise<Socket> => {
  if (!socket) {
    const response = await fetch("/api/auth/token", {
      credentials: "same-origin",
    });
    const { token } = await response.json();

    const socketUrl = `${WS_URL.replace(/\/+$/, "")}${WS_NAMESPACE}`;

    socket = io(socketUrl, {
      path: WS_PATH,
      auth: token ? { token } : undefined,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("🔌 Socket connection error:", error.message);
    });
  }

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
