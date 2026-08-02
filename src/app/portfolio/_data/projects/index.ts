import { aquatiz } from "./aquatiz";
import { donQuijote } from "./don-quijote";
import { hcsaAcademy } from "./hcsa-academy";
import { inspireImmigration } from "./inspire-immigration";
import { seventhMileCoffeeShop } from "./7th-mile-coffee-shop";
import { tokyoSoba } from "./tokyo-soba";
import { uChinaTravel } from "./u-china-travel";
import { yota } from "./yota";

/**
 * Single aggregation point. To add a future case study: create a new
 * file in this folder (copy the shape of any existing one) and add it
 * to this array — nothing else in the Portfolio system needs to change.
 */
export const projects = [
  uChinaTravel,
  donQuijote,
  hcsaAcademy,
  tokyoSoba,
  seventhMileCoffeeShop,
  yota,
  aquatiz,
  inspireImmigration,
];
