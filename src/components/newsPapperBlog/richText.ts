// RichText（紙面に流すテキスト）の記法を読む。
//   改行          → 改行
//   {{AI}}        → 縦中横
//   [文字](URL)   → リンク（URL は http(s):// ・ / ・ # ・ mailto: で始まるもの）
import type { RichText } from "./types";

export type InlineToken =
  | { type: "text"; value: string }
  | { type: "tcy"; value: string };

export type Token =
  | InlineToken
  | { type: "br" }
  | { type: "link"; href: string; external: boolean; children: InlineToken[] };

const PATTERN = /\{\{(.+?)\}\}|\[([^\]\n]+)\]\(([^)\s]+)\)/g;
const SAFE_HREF = /^(https?:\/\/|\/|#|mailto:)/;
const isExternal = (href: string) =>
  /^https?:\/\//.test(href) && !/^https?:\/\/(www\.)?179\.jp(\/|$)/.test(href);

/** {{ }} だけを読む（リンクの中の文字用） */
const parseInline = (text: string): InlineToken[] =>
  text
    .split(/\{\{(.+?)\}\}/)
    .map((value, i) => ({ type: i % 2 ? "tcy" : "text", value }) as const)
    .filter((t) => t.value !== "");

const parseLine = (line: string): Token[] => {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of line.matchAll(PATTERN)) {
    if (m.index > last) tokens.push({ type: "text", value: line.slice(last, m.index) });
    const [whole, tcy, label, href] = m;
    if (tcy !== undefined) {
      tokens.push({ type: "tcy", value: tcy });
    } else if (SAFE_HREF.test(href)) {
      tokens.push({
        type: "link",
        href,
        external: isExternal(href),
        children: parseInline(label),
      });
    } else {
      // 使えない URL はリンクにせず、そのまま出す
      tokens.push({ type: "text", value: whole });
    }
    last = m.index + whole.length;
  }
  if (last < line.length) tokens.push({ type: "text", value: line.slice(last) });
  return tokens;
};

export const parseRichText = (text: RichText): Token[] =>
  text
    .split("\n")
    .flatMap((line, i) => [
      ...(i > 0 ? [{ type: "br" } as const] : []),
      ...parseLine(line),
    ]);

const textOf = (tokens: InlineToken[]) => tokens.map((t) => t.value).join("");

/** 記法を外したテキスト。改行は sep に */
export const toPlainText = (text: RichText, sep = "　") =>
  parseRichText(text)
    .map((t) => (t.type === "br" ? sep : t.type === "link" ? textOf(t.children) : t.value))
    .join("");

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** HTML に（RSS 用）。縦中横は外し、改行は <br>、リンクは <a> */
export const toHtml = (text: RichText) =>
  parseRichText(text)
    .map((t) =>
      t.type === "br"
        ? "<br />"
        : t.type === "link"
          ? `<a href="${escape(t.href)}">${escape(textOf(t.children))}</a>`
          : escape(t.value),
    )
    .join("");

export { escape as escapeHtml };
