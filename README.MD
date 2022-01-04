# crypto-price-data

Super basic shell scripts to download crypto price data from [Coingecko](https://coingecko.com)

Transforms it into a format that is designed to work well with the Google Sheets [ImportJSON](https://github.com/bradjasper/ImportJSON/blob/master/ImportJSON.gs) appscript.

## Usage

e.g. you could run it on a public-facing web server

```
./run.sh > /var/www/html/crypto-prices.json
```

Then in your Google Sheet, try:

```
=ImportJSON("https://yourwebsite.com/crypto-prices.json", "", "rawHeaders,noTruncate,noInherit")
```

which unfortunately ouputs things as two rows... you can combine them into a more usable 2-column layout with the `TRANSPOSE()` function

Could we fix this using a different structure for the JSON? it's a mystery

## License

MIT

Pull requests welcome




