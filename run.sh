#!/bin/bash
# cron-friendly wrapper

cd "$(dirname "$0")"

node price-magic.js > data/usd.json
# cat data/usd.json | jq
cat data/usd.json

