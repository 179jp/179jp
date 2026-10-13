// 見出しを省けるか・あるかの判定（トップ記事のほかは、見出しを省ける）
import type { NoteData, RichText, SerialData } from "./types";

interface HeadFields {
  title?: RichText;
  sub?: RichText;
  kicker?: RichText;
}

/**
 * 見出しがあるか。title の項目があるか、sub・kicker のどれかがあれば見出しを置く。
 * title: "" は「空の見出し」として列を残す（エディターで書くため）
 */
export const hasHead = (story: HeadFields) =>
  story.title !== undefined || Boolean(story.sub) || Boolean(story.kicker);

/** 連載コラムの欄が、見出しなしの本文を上下 2 本にした形か */
export const isSplitSerial = (
  serial: SerialData | readonly [NoteData, NoteData],
): serial is readonly [NoteData, NoteData] => Array.isArray(serial);
