const fs = require('fs')


async function run() {
  const symbols = JSON.parse(
    await fs.readFileSync("data/symbols.json").toString()
  );

  const prices = JSON.parse(
    await fs.readFileSync("data/prices.json").toString()
  );

  const newPrices = {},
        justPrices = {};
  for(let id in prices) {

    const usd = prices[id].usd;

    const res = symbols.filter((j) => {
      if(j.id == id) return j;
    })[0];

    if (!res) {
      // console.error(`error: missing data for ${id}`);
      continue;
    }

    newPrices[id] = {
      // id: id,
      name: res.name,
      symbol: res.symbol,
      usd: usd,
    }

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
