const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const defaultApiBaseUrl = "http://localhost:4000";

export const API_BASE_URL = stripTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl,
);

export const FRONTEND_URL = stripTrailingSlash(
  import.meta.env.VITE_FRONTEND_URL || window.location.origin,
);

export const buildApiUrl = (path: string) => {
  if (!path.startsWith("/")) {
    return `${API_BASE_URL}/${path}`;
  }

  return `${API_BASE_URL}${path}`;
};