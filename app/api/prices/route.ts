import { getCachedPrices, setCachedPrices } from "@/lib/cache";
import { scrapeDealerPrices } from "@/lib/scraper";

export async function GET() {
  try {
    const cached = getCachedPrices();

    // console.log("Cache check - Cached prices:", cached);

    if (cached) {
      return Response.json({
        source: "cache",
        prices: cached,
      });
    }

    const freshPrices = await scrapeDealerPrices();
    // console.log("Scraped fresh prices:", freshPrices);

    setCachedPrices(freshPrices);

    return Response.json({
      source: "scraped",
      prices: freshPrices,
    });

  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}