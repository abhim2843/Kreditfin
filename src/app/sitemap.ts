import type { MetadataRoute } from "next";
import { getBlogList } from "@/lib/sanity/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kreditfin.com";

const staticRoutes = [
  "",
  "/about",
  "/apply",
  "/blogs",
  "/cibil",
  "/contact",
  "/emi-calculator",
  "/fd-calculator",
  "/sip-calculator",
  "/services",
  "/services/business-loans",
  "/services/debt-management-solutions",
  "/services/financial-structuring",
  "/services/home-loan-balance-transfer",
  "/services/home-loan-top-up",
  "/services/loan-against-property",
  "/services/mortgage-advisory",
  "/services/multiple-emi-consolidation",
  "/services/personal-loans",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogList();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
