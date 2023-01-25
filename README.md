# Currency converter

Currency converter app.

## How to run this app

1. Create `.env` file in the root directory.
2. In the `env` file, specify `APIKEY` variable, which is your custom key to the Fixer API (https://apilayer.com/marketplace/fixer-api).
3. Run `docker-compose up --build`.
4. Connect to the DB container and create database called `currencyRates` and collection called `currencies`.
5. Go to `localhost:3000`.

## API

Simple REST API with two basic routes.

1. `/exchange/:source([A-z]{3})-:target([A-z]{3})` route serves an object containing an exchange rate between provided currencies.
    If the source currency has no record in the database, we try to download the exchange rates data from an external API. We call
    the external API also in case that our values are older than 24 hours.
2. `/insertnewrates/` route handles saving new exchange rates to DB. The data is provided as array of valid MongoDB documents in
    the request body.

## Client

Client is basic React app with a form for user input. The conversion is done on the form submit.

## Further development and improvements

* Dropdown menu / autofill for the user input.
* Statistics. This should be implemented as new collection in DB to preserve the data.
    - most used currency
    - total count of requests
    - total amount converted (in USD)
* Display chart of historic exchange rates for given currency.
* Add button for switching the currencies.