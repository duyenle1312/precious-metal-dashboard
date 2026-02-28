import { calculatePortfolioValue } from "@/lib/portfolio";
import { getPrices } from "@/lib/prices";

export default async function Dashboard() {
  const { prices, source } = await getPrices();

  const originalCost = 652.29 + 1531.24;

  const values = calculatePortfolioValue(prices);

  return (
    <div className="w-2xl mx-auto p-6 bg-white rounded-2xl">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-3">
        Precious Metal Dashboard
      </h1>

      {/* Source */}
      <p className="text-sm text-gray-600 text-center mb-5">
        <span className="capitalize">Price source: {source}</span> 
      </p>

      {/* Metals Section */}
      <div className="space-y-6">
        {/* Gold */}
        <div className="border rounded-xl p-4">
          <h3 className="font-bold text-lg mb-2">Gold</h3>
          <p className="mb-3 text-black">
            Total Value:
            <span className="font-semibold ml-2">€{values.gold}</span>
          </p>

          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <li>Kinebar 10g: €{values.topgold10gGold}</li>
            <li>Tavex 1g: €{values.tavex1gGold}</li>
          </ul>
        </div>

        {/* Silver */}
        <div className="border rounded-xl p-4">
          <h3 className="font-bold text-lg mb-3">Silver</h3>

          <p className="mb-3 text-black">
            Total Value:
            <span className="font-semibold ml-2">
              €{values.silver.toFixed(2)}
            </span>
          </p>

          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <li>Eagle: €{values.silverEagle.toFixed(2)}</li>
            <li>Canadian: €{values.silverCanadian.toFixed(2)}</li>
            <li>Britannia: €{values.silverBritannia.toFixed(2)}</li>
            <li>Australian: €{values.silverAussie.toFixed(2)}</li>
            <li>Lunar Horse: €{values.silverLunarHorse.toFixed(2)}</li>
            <li>Libertad (buy): €{values.silverLibertad.toFixed(2)}</li>
          </ul>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="mt-6 border-t pt-4 space-y-2">
        

        <p className="text-gray-700">
          <span className="font-semibold">Unrealized Gain:</span>{" "}
          <span
            className={
              values.total - originalCost >= 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {(values.total - originalCost).toFixed(2)} (
            {(((values.total - originalCost) / originalCost) * 100).toFixed(2)}
            %)
          </span>
        </p>

        <p className="text-gray-700">
          Purchase price:
          <span className="ml-2">€{originalCost.toFixed(2)}</span>
        </p>
      </div>

      {/* Total Value */}
      <div className="mt-6 text-center">
        <h2 className="font-bold text-lg mb-1">Total Portfolio Value</h2>
        <p className="text-3xl font-bold text-indigo-600">
          €{values.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
