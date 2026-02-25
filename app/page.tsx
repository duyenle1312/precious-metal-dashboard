import { calculatePortfolioValue } from "@/lib/portfolio";

async function getPrices() {
  const res = await fetch("http://localhost:3000/api/prices", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prices");
  }

  return res.json();
}

export default async function Dashboard() {
  const { prices, source } = await getPrices();

  // console.log("Fetched prices:", prices);

  const values = calculatePortfolioValue(prices);

  return (
    <main style={{ padding: 24 }}>
      <h1 className="font-bold py-3 text-center text-xl">Precious Metals Dashboard</h1>
      <p className="mt-3">
        <strong>Price source:</strong> {source} <br />
        <br />
      </p>
      <ul>
        <h3 className="font-bold">Gold</h3>
        <li>Tavex 1g Gold: ${values.gold.toFixed(2)}</li>
        <br />
        <h3 className="font-bold">Silver</h3>
        <li>Total Value: ${values.silver.toFixed(2)}</li>
        <br />
        <li>Eagle: ${values.silverEagle.toFixed(2)}</li>
        <li>Canadian: ${values.silverCanadian.toFixed(2)}</li>
        <li>Australia: ${values.silverAussie.toFixed(2)}</li>
        <li>Britannia: ${values.silverBritannia.toFixed(2)}</li>
        <li>Lunar Horse: ${values.silverLunarHorse.toFixed(2)}</li>
        <br />
      </ul>
      <p>Original Cost: $652.29</p>
      <p>
        <span className="font-semibold">Unrealized Gain:</span> {(values.total - 652.29).toFixed(2)} (
        {(((values.total - 652.29) / 652.29) * 100).toFixed(2)} %)
      </p>
      <h2 className="font-bold mt-5">Total Portfolio Value</h2>
      <p style={{ fontSize: 24 }}>${values.total.toFixed(2)}</p>
    </main>
  );
}
