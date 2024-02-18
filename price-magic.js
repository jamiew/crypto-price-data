const fs = require("fs");

function writeFile(filename, data) {
  const fs = require("fs");
  return fs.writeFileSync(filename, JSON.stringify(data));
}

function readConfig() {
  const filename = "symbols.txt";
  const data = fs.readFileSync(filename, "utf8");
  if (!data || data.length == 0) {
    throw new Error(`${filename} config file is blank`);
  }
  return data.split("\n");
}

async function fetchSymbols() {
  return fetch("https://api.coingecko.com/api/v3/coins/list")
    .then((response) => response.json())
    .then((data) => {
      writeFile("data2/symbols.json", data);
      return data;
    })
    .catch((error) => console.error(error));
}

async function fetchPrices() {
  const ids = readConfig().join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      writeFile("data2/prices.json", data);
      return data;
    })
    .catch((error) => console.error(error));
}

async function run() {
  const symbols = await fetchSymbols();
  if (!symbols) throw new Error("no symbols");
  const prices = await fetchPrices();
  if (!prices) throw new Error("no prices");

  const newPrices = {};
  const justPrices = {};
  for (let id in prices) {
    const usd = prices[id].usd;
    // console.log(`id ${id} => ${usd}`);

    const res = symbols.filter((j) => {
      if (j.id == id) return j;
    })[0];

    if (!res) {
      console.error(`error: missing data for ${id}`);
      continue;
    }

    newPrices[id] = {
      // id: id,
      name: res.name,
      symbol: res.symbol,
      usd: usd,
    };

    justPrices[res.symbol] = usd;
  }

  // console.log(newPrices);
  // console.log(JSON.stringify(newPrices));
  console.log(JSON.stringify(justPrices));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
