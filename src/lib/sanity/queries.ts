import { sanityClient, isSanityConfigured } from "./client";

export type SanityImage = { asset?: { _ref?: string; _id?: string } };

export type BlogListItem = {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  mainImage: SanityImage;
};

export type FaqItem = { question: string; answer: string };

export type ComparisonTableBlock = {
  _type: "comparisonTable";
  _key: string;
  column1: string;
  column2: string;
  rows: { label: string; value1: string; value2: string }[];
};

export type FaqListBlock = {
  _type: "faqList";
  _key: string;
  items: FaqItem[];
};

export type ChecklistBlock = {
  _type: "checklist";
  _key: string;
  items: string[];
};

export type BlogPost = BlogListItem & {
  body: unknown[];
  disclaimer?: string;
};

const listQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  author,
  publishedAt,
  mainImage
}`;

const postQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  excerpt,
  author,
  publishedAt,
  mainImage,
  body,
  disclaimer
}`;

export async function getBlogList(): Promise<BlogListItem[]> {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch(listQuery);
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch(postQuery, { slug });
  } catch {
    return null;
  }
}
