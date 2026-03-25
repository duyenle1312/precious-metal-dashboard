import { MetalPrices } from "./cache";

const portfolio = {
  gold: 1,
  silver: 1,
};

export function calculatePortfolioValue(prices: MetalPrices) {
  const silver =
    prices.silverEagle * 2 +
    prices.silverCanadian * 2 +
    prices.silverAussie +
    prices.silverBritannia +
    prices.silverLunarHorse +
    prices.silverLibertad;

  const gold = prices.tavex1gGold + prices.kinebar10gGold;

  return {
    silverEagle: portfolio.silver * (prices.silverEagle || 0),
    silverCanadian: portfolio.silver * (prices.silverCanadian || 0),
    silverAussie: portfolio.silver * (prices.silverAussie || 0),
    silverBritannia: portfolio.silver * (prices.silverBritannia || 0),
    silverLunarHorse: portfolio.silver * (prices.silverLunarHorse || 0),
    silverLibertad: portfolio.silver * (prices.silverLibertad || 0),

    tavex1gGold: prices.tavex1gGold || 0,
    kinebar10gGold: prices.kinebar10gGold || 0,

    gold: gold,

    silver: silver,

    total: gold + silver,
  };
}
