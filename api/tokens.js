export default async function handler(_, res) {
  const resp = await fetch("https://api.dexscreener.com/latest/dex/pairs/bsc");
  const data = await resp.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
