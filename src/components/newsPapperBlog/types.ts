// データの型は schema.ts（content collection のスキーマ）から作る
export type {
  ActivityData,
  ArticleData,
  BrandData,
  EssayData,
  IllustrationName,
  IssueData,
  MastheadData,
  PhotoData,
  PhotoStoryData,
  SerialData,
  Sky,
  TopStoryData,
  WeatherData,
} from "./schema";

// [開始線, 終了線]。CSS の grid line 番号そのまま（紙面は右から 1 列目）
export type Span = readonly [start: number, end: number];

/** 紙面上の配置。col は行（列）、row は段 */
export interface Area {
  col: Span;
  row: Span;
}

/** 紙面に流すテキスト。改行はそのまま、"{{AI}}" で縦中横、[文字](URL) でリンク */
export type RichText = string;
