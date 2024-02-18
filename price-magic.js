const fs = require("fs");

const writeFile = (filename, data) =>
  fs.writeFileSync(filename, JSON.stringify(data));

const readConfig = () => {
  const filename = "symbols.txt";
  const data = fs.readFileSync(filename, "utf8");
  if (!data) throw new Error(`${filename} config file is blank`);
  return data.split("\n");
};

const fetchJson = (url) => fetch(url).then((response) => response.json());

const fetchSymbols = async () => {
  try {
    const data = await fetchJson("https://api.coingecko.com/api/v3/coins/list");
    writeFile("data/symbols.json", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const fetchPrices = async () => {
  try {
    const ids = readConfig().join(",");
    const data = await fetchJson(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    writeFile("data/prices.json", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const run = async () => {
  const symbols = (await fetchSymbols()) || [];
  const prices = (await fetchPrices()) || {};

  const newPrices = {};
  Object.entries(prices).forEach(([id, { usd }]) => {
    const symbolData = symbols.find((j) => j.id === id);
    if (!symbolData) {
      console.error(`error: missing data for ${id}`);
      return;
    }
    newPrices[symbolData.symbol] = usd;
  });

  console.log(JSON.stringify(newPrices));
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
