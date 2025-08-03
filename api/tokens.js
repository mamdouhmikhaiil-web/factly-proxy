import fetch from 'node-fetch';

export default async function handler(req, res) {
  const address = "0x208bf3e7da9639f1eaefa2de78c23396b0682025"; // غيره حسب الحاجة
  const url = `https://api.dexscreener.com/latest/dex/pairs/bsc/${address}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Dexscreener error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in tokens API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
