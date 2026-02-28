import fs from "node:fs";

const rawTaxRates = JSON.parse(
  fs.readFileSync(new URL("../../new-york-tax-rates.json", import.meta.url)),
);

function normalizeCountyName(name) {
  if (!name) return null;

  let formatted = name.trim();

  formatted = formatted.replace(/county/i, "").trim();
  formatted = formatted.replace(/\s+/g, " ");
  formatted = `${formatted} County`;
  return formatted.toLowerCase();
}
const taxRates = Object.fromEntries(
  Object.entries(rawTaxRates).map(([key, value]) => [
    normalizeCountyName(key),
    value,
  ]),
);

function calculateTax(subtotal, countyName) {
  const normalizedCounty = normalizeCountyName(countyName);
  const rates = taxRates[normalizedCounty];
  if (!rates) {
    return null; // Якщо немає даних для цього округу, можна повернути null або кинути помилку
  }

  const compositeRate =
    rates.state_rate + rates.county_rate + rates.city_rate + rates.special_rate;
  const taxAmount = subtotal * compositeRate;
  const totalAmount = subtotal + taxAmount;

  return {
    composite_tax_rate: compositeRate,
    tax_amount: taxAmount,
    total_amount: totalAmount,
    breakdown: {
      state_rate: rates.state_rate,
      county_rate: rates.county_rate,
      city_rate: rates.city_rate,
      special_rate: rates.special_rate,
    },
  };
}
export default calculateTax;
