import { del, issueSignedToken, presignUrl, put } from "@vercel/blob";

const STORAGE_MODE = process.env.COURSE_STORAGE_MODE || "";

export function isBlobStorageEnabled() {
  return STORAGE_MODE === "blob-private" || STORAGE_MODE === "blob-public";
}

export function isPrivateBlobStorage() {
  return STORAGE_MODE === "blob-private";
}

export async function uploadBlobResource({ pathname, bytes, mimeType }) {
  const access = isPrivateBlobStorage() ? "private" : "public";
  const blob = await put(pathname, bytes, {
    access,
    addRandomSuffix: true,
    contentType: mimeType,
    allowOverwrite: false
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    storage: access === "private" ? "blob-private" : "blob-public"
  };
}

export async function deleteBlobResource(resource) {
  if (!resource?.url) return;
  await del(resource.url);
}

export async function createBlobReadUrl(resource, validForMs = 5 * 60 * 1000) {
  if (!resource?.pathname || resource.storage !== "blob-private") return resource?.url || "";
  const token = await issueSignedToken({
    pathname: resource.pathname,
    operations: ["get"],
    validUntil: Date.now() + 60 * 60 * 1000
  });
  const { presignedUrl } = await presignUrl(token, {
    operation: "get",
    pathname: resource.pathname,
    access: "private",
    validUntil: Date.now() + validForMs
  });
  return presignedUrl;
}
