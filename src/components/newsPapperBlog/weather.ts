import type { Sky, WeatherData } from "./types";

export const SKY_LABELS: Record<Sky, string> = {
  sunny: "晴れ",
  "partly-cloudy": "晴れ時々曇り",
  cloudy: "曇り",
  rainy: "雨",
  snowy: "雪",
  thunder: "雷雨",
  foggy: "霧",
};

/** sky を配列にそろえる（1 つ、または「A のち B」） */
export const skiesOf = (weather: WeatherData): Sky[] =>
  Array.isArray(weather.sky) ? [...weather.sky] : [weather.sky];

/** 読み上げ用のことば。例：晴れのち雨 */
export const weatherLabel = (weather: WeatherData) =>
  skiesOf(weather).map((sky) => SKY_LABELS[sky]).join("のち");
