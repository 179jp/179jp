// RSS 用に、1 号分のデータを HTML とテキストにする
import { formatDate, solarTermOf } from "./calendar";
import { weatherLabel } from "./weather";
import { escapeHtml as escape, toHtml, toPlainText } from "./richText";
import type { IssueData, RichText } from "./types";

/** RichText から記法を外したテキスト。改行は全角スペースに */
export const plain = (text: RichText) => toPlainText(text);

const html = toHtml;

const paragraphs = (body: RichText[]) =>
  body.map((p) => `<p>${html(p)}</p>`).join("");

const section = (title: RichText, body: RichText[], sub?: RichText) =>
  `<h2>${html(title)}</h2>` +
  (sub ? `<p><strong>${html(sub)}</strong></p>` : "") +
  paragraphs(body);

/** その日の欄を 1 行に。例：2026年10月6日 火曜日・秋分／京都 晴れのち曇り 24°/15°／8,421歩・ラン 5.2km */
const dayLine = (issue: IssueData) => {
  const { year, month, day, weekday } = formatDate(issue.date);
  const parts = [`${year}年${month}月${day}日 ${weekday}・${solarTermOf(issue.date)}`];
  const { weather, activity } = issue;
  if (weather) {
    const temp =
      weather.high !== undefined || weather.low !== undefined
        ? ` ${weather.high ?? "-"}°/${weather.low ?? "-"}°`
        : "";
    parts.push(`${weather.place ? `${weather.place} ` : ""}${weatherLabel(weather)}${temp}`);
  }
  if (activity) {
    const a = [
      activity.steps !== undefined && `${activity.steps.toLocaleString("ja-JP")}歩`,
      activity.run !== undefined && `ラン ${activity.run}km`,
    ].filter(Boolean);
    if (a.length) parts.push(a.join("・"));
  }
  return parts.join("／");
};

/** 発行日時。YAML の日付（UTC の 0 時）を日本時間の 0 時にする */
export const issuePubDate = (issue: IssueData) =>
  new Date(issue.date.getTime() - 9 * 3600000);

/** 一覧に出す概要。トップ記事の副見出し＋本文の書き出し */
export const issueDescription = (issue: IssueData) =>
  (issue.top.sub ? `${plain(issue.top.sub)}。` : "") +
  `${plain(issue.top.body[0]).slice(0, 80)}…`;

/** 1 号分の本文（紙面の読む順） */
export const issueHtml = (issue: IssueData) =>
  [
    `<p>${escape(dayLine(issue))}</p>`,
    section(issue.top.lead, issue.top.body, issue.top.sub),
    section(issue.photoStory.title, issue.photoStory.body, issue.photoStory.sub),
    section(issue.serial.title, issue.serial.body, issue.serial.kicker),
    section(issue.essay.title, [...issue.essay.body, issue.essay.credit]),
    ...issue.articles.map((a) => section(a.title, a.body, a.sub ?? a.kicker)),
  ].join("");
