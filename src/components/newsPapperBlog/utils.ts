import type { Area } from "./types";

/** Area を grid-column / grid-row の style に変換する */
export const place = ({ col, row }: Area) =>
  `grid-column: ${col[0]} / ${col[1]}; grid-row: ${row[0]} / ${row[1]};`;

/** Area がまたぐ段数 */
export const tiersOf = ({ row }: Area) => row[1] - row[0];
