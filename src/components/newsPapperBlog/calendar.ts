// 日付まわりの計算。date は YAML の日付（UTC の 0 時）をそのまま受け取る

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

// 太陽黄経 0° = 春分 から 15° ごと
const SOLAR_TERMS = [
  "春分", "清明", "穀雨", "立夏", "小満", "芒種",
  "夏至", "小暑", "大暑", "立秋", "処暑", "白露",
  "秋分", "寒露", "霜降", "立冬", "小雪", "大雪",
  "冬至", "小寒", "大寒", "立春", "雨水", "啓蟄",
] as const;

const rad = (deg: number) => (deg * Math.PI) / 180;

/** 太陽の視黄経（度）。Meeus の略算式。誤差は 0.01° 程度 */
const sunLongitude = (time: Date) => {
  const jd = time.getTime() / 86400000 + 2440587.5;
  const t = (jd - 2451545) / 36525;
  const l0 = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
  const m = rad(357.52911 + 35999.05029 * t - 0.0001537 * t * t);
  const c =
    (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(m) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * m) +
    0.000289 * Math.sin(3 * m);
  const omega = rad(125.04 - 1934.136 * t);
  const lambda = l0 + c - 0.00569 - 0.00478 * Math.sin(omega);
  return ((lambda % 360) + 360) % 360;
};

/** その日（日本時間）の終わりの時点で入っている二十四節気 */
export const solarTermOf = (date: Date) => {
  // 日本時間の翌日 0 時 = UTC のその日 15 時
  const endOfDay = new Date(date.getTime() + 15 * 3600000);
  return SOLAR_TERMS[Math.floor(sunLongitude(endOfDay) / 15)];
};

export const formatDate = (date: Date) => ({
  year: date.getUTCFullYear(),
  month: date.getUTCMonth() + 1,
  day: date.getUTCDate(),
  /** 例：火曜日 */
  weekday: `${WEEKDAYS[date.getUTCDay()]}曜日`,
});
