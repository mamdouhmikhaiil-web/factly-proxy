// لا حاجة لسطر import fetch من هنا بعد الآن
// import fetch from 'node-fetch'; // احذف هذا السطر

export default async function handler(req, res) {
  // قم بتغيير العنوان هنا إلى عنوان صحيح
  const address = "0x0E09FaBb73Bd3Ade0a17ECC321fD13a19e81cE82";
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
