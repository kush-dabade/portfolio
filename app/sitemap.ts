import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.seo.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.seo.url}/resume`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
