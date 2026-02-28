import { MetalPrices } from "./cache";

const portfolio = {
  gold: 1,
  silver: 1,
};

export function calculatePortfolioValue(prices: MetalPrices) {
  return {
    silverEagle: portfolio.silver * (prices.silverEagle || 0),
    silverCanadian: portfolio.silver * (prices.silverCanadian || 0),
    silverAussie: portfolio.silver * (prices.silverAussie || 0),
    silverBritannia: portfolio.silver * (prices.silverBritannia || 0),
    silverLunarHorse: portfolio.silver * (prices.silverLunarHorse || 0),
    silverLibertad: portfolio.silver * (prices.silverLibertad || 0),
    tavex1gGold: portfolio.gold * (prices.tavex1gGold || 0),

    gold: prices.tavex1gGold || 0,
    topgold10gGold: prices.topgold10gGold || 0,

    silver:
      prices.silverEagle +
      prices.silverCanadian +
      prices.silverAussie +
      prices.silverBritannia +
      prices.silverLunarHorse,

    total:
      prices.topgold10gGold +
      prices.tavex1gGold +
      prices.silverEagle +
      prices.silverCanadian +
      prices.silverAussie +
      prices.silverBritannia +
      prices.silverLunarHorse,
  };
}
