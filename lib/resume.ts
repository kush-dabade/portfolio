import { existsSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "@/lib/config/site-config";

// Checked at build time, so the static pages only offer a download when the PDF ships with them.
export const hasResume = (): boolean =>
    existsSync(path.join(process.cwd(), "public", siteConfig.resume.file));
