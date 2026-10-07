// news-papper-blog の RSS フィード（/rss.xml）
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import {
  issueDescription,
  issueHtml,
  issuePubDate,
  plain,
} from "../components/newsPapperBlog/feed";
import { getIssues } from "../components/newsPapperBlog/issues";

export async function GET(context: APIContext) {
  const issues = await getIssues();
  const brand = issues[0]?.data.brand;

  return rss({
    title: "179.jp",
    description: brand
      ? `${brand.name}　${plain(brand.tagline)}`
      : "179.jp",
    site: context.site ?? "https://179.jp",
    items: issues.map(({ id, data }) => ({
      title: plain(data.top.lead),
      link: `/news-papper-blog/${id}/`,
      pubDate: issuePubDate(data),
      description: issueDescription(data),
      content: issueHtml(data),
    })),
    customData: "<language>ja</language>",
    trailingSlash: false,
  });
}
