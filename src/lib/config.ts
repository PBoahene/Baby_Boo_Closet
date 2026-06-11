const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const rawAppBaseUrl = import.meta.env.VITE_APP_BASE_URL?.trim();

export const API_BASE_URL = rawApiBaseUrl
  ? trimTrailingSlash(rawApiBaseUrl)
  : "";

export const APP_BASE_URL = rawAppBaseUrl
  ? trimTrailingSlash(rawAppBaseUrl)
  : window.location.origin;

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}