#!/bin/bash

./coingecko-symbols.sh > data/symbols.json
./coingecko-prices.sh > data/prices.json
node price-magic.js > data/usd.json
cat data/usd.json | jq

