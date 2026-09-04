import createImageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

type SanityImageSource = { asset?: { _ref?: string; _id?: string } } | string;

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
