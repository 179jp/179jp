import { z } from "astro/zod";

// 新聞ブログ 1 号分のスキーマ。content.config.ts から使い、型もここから作る

/**
 * 紙面に流すテキスト。
 * - 改行はそのまま改行（YAML の `|` で書く）
 * - "{{AI}}" のように {{ }} で囲むと縦中横
 * - [文字](URL) でリンク
 * 前後の空白・改行は落とす（`|` の末尾の改行で <br> が入らないように）
 */
const richText = z.string().trim();
const paragraphs = z.array(richText).min(1);

export const illustrationNames = ["wooden-box", "osmanthus", "k-chair", "coffee-filter"] as const;

const photo = z.union([
  z.object({ alt: z.string(), src: z.string() }),
  z.object({ alt: z.string(), illustration: z.enum(illustrationNames) }),
]);

const masthead = z.object({
  number: z.string(),
  date: z.string(),
  title: z.string(),
  note: z.string(),
  frequency: z.string(),
});

const brand = z.object({
  logo: z.object({ src: z.string(), alt: z.string() }),
  name: z.string(),
  tagline: richText,
  credit: z.string(),
});

/** トップ記事：大見出し＋副見出し＋本文 */
const topStory = z.object({
  lead: richText,
  sub: richText.optional(),
  body: paragraphs,
});

/** 写真記事：見出し＋写真＋キャプション＋本文。title の項目を書かなければ見出しなし（写真を見出しの列まで広げる）。title: "" は空の見出し */
const photoStory = z.object({
  title: richText.optional(),
  sub: richText.optional(),
  photo,
  caption: richText,
  body: paragraphs,
});

/** 連載コラム：白抜きの帯見出し＋本文 */
const serial = z.object({
  kicker: richText,
  title: richText,
  body: paragraphs,
});

/** 囲み見出しのエッセイ（天声AI語） */
const essay = z.object({
  title: richText,
  body: paragraphs,
  credit: richText,
});

/** 1 段の記事。写真は任意 */
const article = z.object({
  kicker: richText.optional(),
  title: richText,
  sub: richText.optional(),
  titleSize: z.enum(["m", "l"]).optional(),
  body: paragraphs,
  photo: photo.optional(),
  caption: richText.optional(),
});

/** 見出しなしの本文（4 段目右に 2 本並べる。10/7 号から） */
const note = z.object({
  body: paragraphs,
});

export const skies = [
  "sunny",
  "partly-cloudy",
  "cloudy",
  "rainy",
  "snowy",
  "thunder",
  "foggy",
] as const;
const sky = z.enum(skies);

/** その日の天気。sky は 1 つ（sky: rainy / sky: [rainy]）、または「A のち B」の 2 つ（sky: [sunny, rainy]） */
const weather = z.object({
  /** その日いた場所（都道府県名） */
  place: z.string().optional(),
  sky: z.union([sky, z.array(sky).min(1).max(2)]),
  high: z.number().optional(),
  low: z.number().optional(),
});

/** その日の記録 */
const activity = z.object({
  /** 歩数 */
  steps: z.number().int().optional(),
  /** ランニング距離（km） */
  run: z.number().optional(),
  /** その日の void のメモの数 */
  memos: z.number().int().nonnegative().optional(),
  /** そのうち、リンク（参照元）の付いたメモの数。output = memos - linkedMemos */
  linkedMemos: z.number().int().nonnegative().optional(),
});

export const issueSchema = z.object({
  /** 発行日。一覧の並び順などに使う */
  date: z.coerce.date(),
  /** 下書き。true の号は本番ビルドに出さない（開発サーバーでは出す） */
  draft: z.boolean().default(false),
  masthead,
  brand,
  weather: weather.optional(),
  activity: activity.optional(),
  top: topStory,
  photoStory,
  serial,
  essay,
  /** 4 段目右の、見出しなしの本文 2 本（読む順＝右から）。あるときは articles は 1 本（3 段目左の記事）だけ */
  notes: z.tuple([note, note]).optional(),
  /**
   * 記事。notes がない号（10/6 まで）は 2 本：[4 段目右の記事, 3 段目左の記事]。
   * notes がある号は 1 本：[3 段目左の記事]。3 段目左の記事の写真・キャプションは 4 段目左に置く
   */
  articles: z.union([z.tuple([article, article]), z.tuple([article])]),
}).superRefine((issue, ctx) => {
  const expected = issue.notes ? 1 : 2;
  if (issue.articles.length !== expected) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["articles"],
      message: issue.notes
        ? "notes があるときは、articles は 1 本（3 段目左の記事）だけにします"
        : "notes がないときは、articles は 2 本にします",
    });
  }
});

export type IssueData = z.infer<typeof issueSchema>;
export type MastheadData = z.infer<typeof masthead>;
export type BrandData = z.infer<typeof brand>;
export type PhotoData = z.infer<typeof photo>;
export type TopStoryData = z.infer<typeof topStory>;
export type PhotoStoryData = z.infer<typeof photoStory>;
export type SerialData = z.infer<typeof serial>;
export type EssayData = z.infer<typeof essay>;
export type ArticleData = z.infer<typeof article>;
export type NoteData = z.infer<typeof note>;
export type WeatherData = z.infer<typeof weather>;
export type ActivityData = z.infer<typeof activity>;
export type Sky = (typeof skies)[number];
export type IllustrationName = (typeof illustrationNames)[number];
