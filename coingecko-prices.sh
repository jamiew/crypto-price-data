#!/bin/bash

# TODO read from file
data=(
  ethereum 
  bitcoin 
  helium
  helium-iot
  helium-mobile
  filecoin
  the-graph
  tezos
  blockstack
  snowbank
  klima-dao
  defi-kingdoms
  harmony
  avalanche
  avalanche-2
  friends-with-benefits-pro
  ethereum-name-service
  livepeer
  xdai
  weth
  usd-coin
  wrapped-steth
  matic-network
  toucan-protocol-base-carbon-tonne
  solana
  gods-unchained
  cabin
  interest-compounding-eth-index
  staked-ether
  lido-staked-ether
  wrapped-steth
  rocket-pool
  rocket-pool-eth
  optimism
  looks
  magic-internet-money
  arbitrum
)

# combine into comma-separated string
printf -v joined '%s,' "${data[@]}"
ids="${joined%,}"
# echo $ids

# other available query params:
# include_market_cap
# include_24hr_vol
# include_24hr_change
# include_last_updated_at

outfile="/var/www/html/secret/crypto-prices.json"
output=$(curl -s "https://api.coingecko.com/api/v3/simple/price?ids=$ids&vs_currencies=usd")
echo "$output"
# echo "$output" | jq
# echo "$output" > "$outfile"


