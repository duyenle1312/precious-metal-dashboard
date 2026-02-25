type PriceCache = {
  data: MetalPrices | null;
  updatedAt: number;
};

export type MetalPrices = {
  silverEagle: number;
  silverCanadian: number;
  silverAussie: number;
  silverBritannia: number;
  silverLunarHorse: number;
  silverLibertad: number;
  tavex1gGold: number;
  topgold10gGold: number;
  gold?: number;
  silver?: number;
  platinum?: number;
};

const TEN_MINUTES = 10 * 60 * 1000;

let cache: PriceCache = {
  data: null,
  updatedAt: 0,
};

export function getCachedPrices() {
  const isFresh = Date.now() - cache.updatedAt < TEN_MINUTES;
  return isFresh ? cache.data : null;
}

export function setCachedPrices(data: MetalPrices) {
  cache = {
    data,
    updatedAt: Date.now(),
  };
}
