const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "")
    : "http://localhost:5000");

export function getImageUrl(path, fallback = "/images/categories/mixed-nuts.png") {
  if (!path) return fallback;
  if (typeof path !== "string") return fallback;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) return path;
  if (path.startsWith("/images/") || path.startsWith("/assets/") || path.startsWith("/icons/")) return path;
  if (path.startsWith("/")) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/${path}`;
}
