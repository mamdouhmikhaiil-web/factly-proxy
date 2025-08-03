// api/tokens.js
export default async function handler(req, res) {
  const response = await fetch("https://api.dexscreener.com/latest/dex/pairs/bsc");
  const data = await response.json();

  // فلترة التوكنات: عليها سيولة، بدون تحذيرات، البيع والشراء شغالين
  const filtered = data.pairs.filter(pair => {
    return (
      pair.liquidity.usd > 10000 &&
      !pair.baseToken.name.toLowerCase().includes("warn") &&
      !pair.baseToken.name.toLowerCase().includes("risk") &&
      pair.priceUsd !== "0"
    );
  });

  res.status(200).json({ pairs: filtered });
}
