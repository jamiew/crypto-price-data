# crypto-price-data

Simple vanilla js script to download crypto price data from [Coingecko](https://coingecko.com)

Transforms it into a format that is designed to work well with the Google Sheets [ImportJSON](https://github.com/bradjasper/ImportJSON/blob/master/ImportJSON.gs) appscript.

## Usage

Edit the `symbols.txt` file and put in Coingecko-compatible ids, which come from their [coins/list API endpoint](https://api.coingecko.com/api/v3/coins/list). 
90% of the time the id is the same as the slug of their token urls, like ["ethereum"](https://www.coingecko.com/en/coins/ethereum), 
but not always. Unfortunately I haven't found a good way to predict when it's not.

Then run the script. To import it into Google Sheets it needs to be publicly accessible, 
so you could run it on public-facing web server, or save it to a [gist](https://gist.github.com) or [val](https://val.town)

```
./run.sh > /var/www/html/crypto-prices.json
```

Then in your Google Sheet, try something like:

```
=ImportJSON("https://yourwebsite.com/crypto-prices.json", "", "rawHeaders,noTruncate,noInherit")
```

which unfortunately ouputs things as two rows... you can combine them into a more usable 2-column layout with the `TRANSPOSE()` function

Could we fix this using a different structure for the JSON? it's a mystery

## License

MIT

Pull requests welcome




