import { createClient } from "@sanity/client";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// True once the client has actually set up a Sanity project. Until then,
// pages fall back to local placeholder content instead of erroring out.
export const isSanityConfigured = Boolean(sanityProjectId);

export const sanityClient = createClient({
  projectId: sanityProjectId || "placeholder",
  dataset: sanityDataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});
