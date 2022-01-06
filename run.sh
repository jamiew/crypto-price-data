#!/bin/bash

cd "$(dirname "$0")"

./coingecko-symbols.sh > data/symbols.json
./coingecko-prices.sh > data/prices.json
node price-magic.js > data/usd.json
# cat data/usd.json | jq
cat data/usd.json

