import type { IllustrationName } from "../types";
import WoodenBox from "./WoodenBox.astro";
import Osmanthus from "./Osmanthus.astro";
import KChair from "./KChair.astro";

// PhotoData.illustration の名前 → イラストのコンポーネント
export const illustrations = {
  "wooden-box": WoodenBox,
  osmanthus: Osmanthus,
  "k-chair": KChair,
} satisfies Record<IllustrationName, unknown>;
