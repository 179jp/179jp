// 号の一覧を取り出す。本番ビルドでは draft の号を除き、開発サーバーでは draft も含める
import { getCollection } from "astro:content";

const showDrafts = import.meta.env.DEV;

/** 公開する号（開発中は draft も）。date の新しい順 */
export const getIssues = async () =>
  (
    await getCollection("newsPapperBlog", ({ data }) => showDrafts || !data.draft)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

/** 最新号。1 つもなければエラー */
export const getLatestIssue = async () => {
  const [latest] = await getIssues();
  if (!latest) throw new Error("src/content/news-papper-blog に公開できる号がありません");
  return latest;
};

/** 前後の号へのリンク。prev = 前の日（古い号）、next = 次の日（新しい号） */
export interface IssueLink {
  href: string;
  date: Date;
}

const linkOf = (entry: { id: string; data: { date: Date } }): IssueLink => ({
  href: `/news-papper-blog/${entry.id}`,
  date: entry.data.date,
});

/** id の号の、前の日・次の日の号（なければ undefined） */
export const getNeighbors = async (id: string) => {
  const issues = await getIssues(); // 新しい順
  const i = issues.findIndex((issue) => issue.id === id);
  const older = i >= 0 ? issues[i + 1] : undefined;
  const newer = i > 0 ? issues[i - 1] : undefined;
  return {
    prev: older && linkOf(older),
    next: newer && linkOf(newer),
  };
};
