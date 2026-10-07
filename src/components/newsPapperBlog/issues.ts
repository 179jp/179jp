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
