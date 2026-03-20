import { combine, createDomain } from "effector";

import { $financeItems } from "../financeItemsModel/financeItemsModel";

// Const 
export const currencyNames = ["RUB", "IDR", "EUR", "USD", "BYN"];

// Domain
const currencyExchangeDomain = createDomain();

// Events
export const setFrom = currencyExchangeDomain.createEvent<string>();
export const setFromValue = currencyExchangeDomain.createEvent<number>();
export const setTo = currencyExchangeDomain.createEvent<string>();
export const setCurrentCurrency = currencyExchangeDomain.createEvent<string>();
export const getExchange = currencyExchangeDomain.createEvent<string[]>();

// Store
export const $availibleCurrency =
  currencyExchangeDomain.createStore(currencyNames);

export const $from = currencyExchangeDomain
  .createStore<string>("BYN")
  .on(setFrom, (_, currencyName: string) => currencyName);

export const $to = currencyExchangeDomain
  .createStore<string>("IDR")
  .on(setTo, (_, currencyName: string) => currencyName);

interface ExchangeRateTable {
  [key: string]: any
}

const $exchangeRateTable = currencyExchangeDomain.createStore<ExchangeRateTable>({
  "EUR": {
    "EUR": 1,
    "RUB": 94.37,
    "IDR": 19494.28,
    "USD": 1.17,
    "BYN": 3.37,
  },
  "RUB": {
    "RUB": 1,
    "EUR": 0.011,
    "IDR": 207.36,
    "USD": 0.012,
    "BYN": 0.035,
  },
  "IDR": {
    "IDR": 1,
    "EUR": 0.000050,
    "RUB": 0.0048,
    "USD": 0.000060,
    "BYN": 0.00017,
  },
  "USD": {
    "USD": 1,
    "RUB": 80.25,
    "IDR": 16692.30,
    "EUR": 0.85,
    "BYN": 2.86,
  },
  "BYN": {
    "BYN": 1,
    "RUB": 28.16,
    "IDR": 5880.16,
    "EUR": 0.30
  },
});

export const $fromValue = currencyExchangeDomain
  .createStore<number>(1)
  .on(setFromValue, (_, e: any) => e.target.value);

export const $exchangeValueRes = combine($fromValue, $from, $to, $exchangeRateTable, (fromValue, from, to, exchangeRateTable) =>
  Math.round((exchangeRateTable[from][to] * fromValue) * 100) / 100
);

export const $allExpenses = combine($financeItems, (financeItems) => {
  const totalBalance = financeItems.reduce((acc: number, el) => {
    acc = Number(el.price) + acc;
    return acc;
  }, 0);
  return totalBalance;
});

export const $balance = combine(
  $exchangeValueRes,
  $allExpenses,
  (exchangeValue, expanses) => Number(exchangeValue) - expanses
);