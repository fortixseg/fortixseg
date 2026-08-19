import { handleRequest } from "../server.js";

export default async function handler(request, response) {
  const host = request.headers.host || "localhost";
  const url = new URL(request.url || "/api", `https://${host}`);
  const rewrittenPath = url.searchParams.get("path");

  if (rewrittenPath) {
    url.searchParams.delete("path");
    const suffix = url.search ? url.search : "";
    request.url = `/api/${rewrittenPath.replace(/^\/+/, "")}${suffix}`;
  }

  return handleRequest(request, response);
}
