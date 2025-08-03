import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.dexscreener.com/latest/dex/pairs/bsc");

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    const filtered = data.pairs.filter(pair => {
      return (
        pair.liquidity &&
        pair.liquidity.usd &&
        pair.liquidity.usd > 10000 &&
        pair.baseToken &&
        pair.baseToken.name &&
        pair.baseToken.symbol &&
        pair.priceUsd &&
        !pair.baseToken.name.toLowerCase().includes("warn") &&
        !pair.baseToken.name.toLowerCase().includes("risk")
      );
    });

    res.status(200).json({ pairs: filtered });
  } catch (error) {
    console.error("Error in tokens API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
