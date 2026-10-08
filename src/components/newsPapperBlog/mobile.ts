// モバイルの割り付けの計算。記事ごとに 1 ブロックにして縦に積む。
// 本文の行数を字数から見積もり、ブロックの段数と列数を決める
import { PAPER } from "./config";
import { parseRichText } from "./richText";
import type { RichText } from "./types";

/** 行頭禁則などで見積もりより行が増える分 */
const SLACK_LINES = 1;

/** 字数。半角（横に寝かせて組む英数字）は半分と数える */
const charsOf = (text: string) =>
  [...text].reduce((n, c) => n + (/[\x20-\x7e]/.test(c) ? 0.5 : 1), 0);

/** 1 行 PAPER.chars 字で折り返したときの行数。縦中横は 1 字、段落の頭は 1 字下げ、改行と段落で行を改める */
export const linesOf = (paragraphs: RichText[]) =>
  paragraphs.reduce((sum, p) => {
    const lengths = [1];
    for (const t of parseRichText(p)) {
      if (t.type === "br") lengths.push(0);
      else if (t.type === "tcy") lengths[lengths.length - 1] += 1;
      else {
        const chars = (t.type === "link" ? t.children : [t]).reduce(
          (n, c) => n + (c.type === "tcy" ? 1 : charsOf(c.value)),
          0,
        );
        lengths[lengths.length - 1] += chars;
      }
    }
    return (
      sum +
      lengths.reduce((n, len) => n + Math.max(1, Math.ceil(len / PAPER.chars)), 0)
    );
  }, 0);

interface BlockOptions {
  /** 本文の行数 */
  lines: number;
  /** 見出し・写真など、本文以外の列数 */
  fixed: number;
  minTiers?: number;
  maxTiers?: number;
}

/**
 * ブロックの段数と列数。画面幅（PAPER.mobileLines 列）に収まるだけ段を増やし（maxTiers まで）、
 * それでも入りきらない分は列を増やす（横スクロール）。画面幅より狭くはしない
 */
export const blockSize = ({
  lines,
  fixed,
  minTiers = 1,
  maxTiers = Infinity,
}: BlockOptions) => {
  const need = lines + SLACK_LINES;
  const avail = PAPER.mobileLines - fixed;
  const tiers = Math.min(maxTiers, Math.max(minTiers, Math.ceil(need / avail)));
  const bodyCols = Math.max(avail, Math.ceil(need / tiers));
  return { tiers, cols: fixed + bodyCols };
};
