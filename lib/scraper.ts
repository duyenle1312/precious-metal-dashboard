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
      $("span.type-outer.obnovi.cat2-547")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;
  const silverCanadian =
    parseFloat(
      $("span.type-outer.obnovi.cat2-515")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;
  const silverAussie =
    parseFloat(
      $("span.type-outer.obnovi.cat2-516")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;
  const silverBritannia =
    parseFloat(
      $("span.type-outer.obnovi.cat2-711")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;

  let silverLunarHorse =
    parseFloat(
      $("span.type-outer.obnovi.cat2-599")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;

  const silverLibertad =
    parseFloat(
      $("span.type-outer.obnovi.cat2-548")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;

  if (silverLunarHorse === 0) {
    // Lunar Horse 2026
    res = await fetch(
      "https://tavex.bg/en/silver/1-oz-australian-lunar-year-of-the-horse-2026-silver-coin/",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 Portfolio Tracker",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch dealer prices");
    }

    html = await res.text();
    $ = cheerio.load(html);

    silverLunarHorse =
      parseFloat(
        $("span.product-poster__table-label.product-poster__table-label--2")
          .text()
          .trim()
          .split("\n")[2]
          .trim()
          .replace(",", ".")
          .replace(/[^\d.]/g, ""),
      ) || 0;
  }

  // 1g gold Tavex
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
        .split("\n")[2]
        .trim()
        .replace(",", ".")
        .replace(/[^\d.]/g, ""),
    ) || 0;

  // 10g gold Kinebar
  res = await fetch(
    "https://igold.bg", //
    // "https://topgold.bg/product/10-grama-zlatno-kyulche-argor-heraeus-kinebar/",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Portfolio Tracker",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dealer prices");
  }

  html = await res.text();
  $ = cheerio.load(html);

  const kinebar10giGold =
    parseFloat(
      $("span.type-outer.obnovi.cat2E-238")
        .text()
        .replace(/[^0-9.]/g, ""),
    ) || 0;

    res = await fetch(
    // "https://igold.bg", //
    "https://topgold.bg/product/10-grama-zlatno-kyulche-argor-heraeus-kinebar/",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Portfolio Tracker",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dealer prices");
  }

  html = await res.text();
  $ = cheerio.load(html);

  const kinebar10gTopGold =
    parseFloat(
      $("span.woocommerce-Price-amount.amount.dynamic-price-buy-869")
        .text()
        .trim()
        .replace(",", ".")
        .replace(/[^\d.]/g, ""),
    ) || 0;

    const kinebar10gGold = kinebar10giGold > kinebar10gTopGold ? kinebar10giGold : kinebar10gTopGold;

  if (
    [
      silverEagle,
      silverCanadian,
      silverAussie,
      silverBritannia,
      silverLunarHorse,
      silverLibertad,
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
    silverLibertad,

    tavex1gGold,
    kinebar10gGold,
  };
}
