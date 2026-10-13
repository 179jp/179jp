import type { IllustrationName } from "../types";
import WoodenBox from "./WoodenBox.astro";
import Osmanthus from "./Osmanthus.astro";
import KChair from "./KChair.astro";
import CoffeeFilter from "./CoffeeFilter.astro";
import TaggedKey from "./TaggedKey.astro";
import BracketInFrame from "./BracketInFrame.astro";

// PhotoData.illustration の名前 → イラストのコンポーネント
export const illustrations = {
  "wooden-box": WoodenBox,
  osmanthus: Osmanthus,
  "k-chair": KChair,
  "coffee-filter": CoffeeFilter,
  "tagged-key": TaggedKey,
  "bracket-in-frame": BracketInFrame,
} satisfies Record<IllustrationName, unknown>;
