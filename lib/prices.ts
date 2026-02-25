import { scrapeDealerPrices } from "./scraper";
import { getCachedPrices, setCachedPrices, MetalPrices } from "./cache";

export async function getPrices(): Promise<{ prices: MetalPrices; source: string }> {
  const cached = getCachedPrices();
  if (cached) {
    return { prices: cached, source: "cache" };
  }

  const freshPrices = await scrapeDealerPrices();
  setCachedPrices(freshPrices);
  return { prices: freshPrices, source: "scraped" };
}