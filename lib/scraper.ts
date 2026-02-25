import * as cheerio from "cheerio";
import { MetalPrices } from "./cache";

export async function scrapeDealerPrices(): Promise<MetalPrices> {
  let res = await fetch("https://igold.bg/srebro", {
    headers: {
      "User-Agent": "Mozilla/5.0 Portfolio Tracker",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dealer prices");
  }

  let html = await res.text();
  let $ = cheerio.load(html);

  const silverEagle =
    parseFloat(
      $("span.type-outer.obnovi.cat2E-547")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;
  const silverCanadian =
    parseFloat(
      $("span.type-outer.obnovi.cat2E-515")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;
  const silverAussie =
    parseFloat(
      $("span.type-outer.obnovi.cat2E-516")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;
  const silverBritannia =
    parseFloat(
      $("span.type-outer.obnovi.cat2E-711")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;

  const silverLunarHorse =
    parseFloat(
      $("span.type-outer.obnovi.cat2E-599")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;

  res = await fetch("https://tavex.bg/en/gold/1-gram-tavex-gold-bar/", {
    headers: {
      "User-Agent": "Mozilla/5.0 Portfolio Tracker",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dealer prices");
  }

  html = await res.text();
  $ = cheerio.load(html);

  const tavex1gGold =
    parseFloat(
      $("span.product-poster__table-label.product-poster__table-label--2")
        .text()
        .trim()
        .split("\n")[2].trim()
        .replace(",", ".")
        .replace(/[^\d.]/g, "")
    ) || 0;


  if (
    [
      silverEagle,
      silverCanadian,
      silverAussie,
      silverBritannia,
      silverLunarHorse,
      tavex1gGold,
    ].some(isNaN)
  ) {
    throw new Error("Invalid scraped prices");
  }

  return {
    silverEagle,
    silverCanadian,
    silverAussie,
    silverBritannia,
    silverLunarHorse,
    tavex1gGold,
  };
}
