// 紙面の骨格。styles/newsPapper/variables.css の --np-lines / --np-tiers / --np-chars / --np-m-lines と合わせる
export const PAPER = {
  lines: 54,
  tiers: 4,
  /** 1 行（1 段）の字数 */
  chars: 12,
  /** モバイルで画面幅に収める行数 */
  mobileLines: 18,
} as const;
