# web URL:
# https://gist.github.com/jamiew/92937fc7b2a3e0192190b10c1cc8fa6b
# raw URL, tied to one commit:
# https://gist.githubusercontent.com/jamiew/92937fc7b2a3e0192190b10c1cc8fa6b/raw/7c45ff90064e9b4f527260f52270b51361ead4d2/prices.json
# raw URL, always latest:
# https://gist.githubusercontent.com/jamiew/92937fc7b2a3e0192190b10c1cc8fa6b/raw/prices.json
set -e

cd "$(dirname "$0")"

gist_id="92937fc7b2a3e0192190b10c1cc8fa6b"
filename="prices.json" # don't change! must match the gist 

echo "Running, prettifying, and saving to $filename ..."
echo "cwd=$(pwd -P)"
/home/jamie/dev/crypto-price-data/run.sh | jq > "$filename"

echo "Updating gist $gist_id ..."
/usr/bin/gh gist edit "$gist_id" "$filename"

echo "All done"
rm "$filename"
