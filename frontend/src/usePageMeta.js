import { useEffect } from "react";
import { siteConfig } from "./config/siteConfig";
import sharingLogo from "./assets/trinexora-banner-logo-transparent.png";

function updateHeadTag(selector, tagName, attributes, content) {
  const matches = [...document.head.querySelectorAll(selector)];
  if (content == null) {
    matches.forEach((tag) => tag.remove());
    return;
  }
  const tag = matches.shift() || document.createElement(tagName);
  matches.forEach((duplicate) => duplicate.remove());
  Object.entries(attributes).forEach(([name, value]) => tag.setAttribute(name, value));
  tag.setAttribute(tagName === "link" ? "href" : "content", content);
  if (!tag.parentNode) document.head.appendChild(tag);
}

export function usePageMeta({ title, description, path, noindex = false }) {
  useEffect(() => {
    const url = `${siteConfig.siteUrl}${path}`;
    // A dedicated public/og-image.png is not available yet; reuse the existing logo.
    const imageUrl = new URL(sharingLogo, siteConfig.siteUrl).href;
    const meta = (attribute, name, content) => updateHeadTag(
      `meta[${attribute}="${name}"]`, "meta", { [attribute]: name }, content
    );

    document.title = title;
    meta("name", "description", description);
    updateHeadTag('link[rel="canonical"]', "link", { rel: "canonical" }, url);
    meta("property", "og:title", title);
    meta("property", "og:description", description);
    meta("property", "og:type", "website");
    meta("property", "og:url", url);
    meta("property", "og:site_name", siteConfig.siteName);
    meta("property", "og:image", imageUrl);
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", description);
    meta("name", "twitter:image", imageUrl);
    meta("name", "robots", noindex ? "noindex, nofollow" : null);
  }, [title, description, path, noindex]);
}
