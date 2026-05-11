export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

export const API_URL = process.env.NEXT_PUBLIC_API_URL!;
export const ENABLE_REFRESH = process.env.NEXT_PUBLIC_ENABLE_REFRESH === "true";


export const isShowFakeData = process.env.NEXT_PUBLIC_SHOW_FAKE_DATA === "true";