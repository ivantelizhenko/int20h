import { Order } from "../db/models/OrderModel.js";
import getCounty from "../utils/getCountry.js";
import calculateTax from "../utils/calculateTax.js";
import pagination from "../utils/paginationUtils.js";
import buildFilterQuery from "../utils/filterUtil.js";
import createHttpError from "http-errors";

export const getAllOrdersService = async ({
  page = 1,
  limit = 5,
  filters = {},
}) => {
  const where = buildFilterQuery(filters);
  const orders = await pagination(Order, page, limit, where);
  return orders;
};

export const createOrderService = async (payload) => {
  const { latitude, longitude, subtotal } = payload;

  // 1. Грубі межі (Bounding Box) залишаємо для швидкого відсікання "сміттєвих" даних,
  // але потрібно враховувати, що деякі точки можуть бути в межах цього прямокутника,
  // але не в жодному окрузі NY.
  // Тому після цього кроку потрібно буде перевірити, чи дійсно точка знаходиться в одному з округів.
  const LAT_MIN = 40.4774,
    LAT_MAX = 45.0153;
  const LNG_MIN = -79.7624,
    LNG_MAX = -71.7517;

  const errors = {};

  if (latitude == null) errors.latitude = "Latitude is required";
  if (longitude == null) errors.longitude = "Longitude is required";
  if (subtotal == null) {
    errors.subtotal = "Subtotal is required";
  } else if (subtotal < 0) {
    errors.subtotal = "Subtotal must be a positive number";
  }

  if (!errors.latitude && (latitude < LAT_MIN || latitude > LAT_MAX)) {
    errors.latitude = "Latitude is outside of New York State range";
  }
  if (!errors.longitude && (longitude < LNG_MIN || longitude > LNG_MAX)) {
    errors.longitude = "Longitude is outside of New York State range";
  }

  let countyName = null;
  if (Object.keys(errors).length === 0) {
    countyName = getCounty(latitude, longitude);

    if (!countyName) {
      // Якщо точка в прямокутнику, але не в жодному окрузі NY
      errors.location =
        "The coordinates are outside of New York State boundaries";
    }
  }
  if (Object.keys(errors).length > 0) {
    throw createHttpError(400, "Validation failed", {
      errors,
    });
  }

  const taxData = calculateTax(subtotal, countyName);

  const orderPayload = {
    ...payload,
    county_name: countyName,
    composite_tax_rate: taxData.composite_tax_rate,
    tax_amount: taxData.tax_amount,
    total_amount: taxData.total_amount,
    state_rate: taxData.breakdown.state_rate,
    county_rate: taxData.breakdown.county_rate,
    city_rate: taxData.breakdown.city_rate,
    special_rates: taxData.breakdown.special_rate,
    tax_breakdown: taxData.breakdown,
  };

  return await Order.create(orderPayload);
};

export const importOrdersService = async (orders) => {
  const processed = orders
    .map((order, i) => {
      try {
        if (!order || typeof order !== 'object') return null;

        const lat = parseFloat(order.latitude);
        const lng = parseFloat(order.longitude);
        const sub = parseFloat(order.subtotal);
        
        if (isNaN(lat) || isNaN(lng) || isNaN(sub)) {
          return null;
        }

        const countyName = getCounty(lat, lng);
        if (!countyName) {
          return null;
        }

        const taxData = calculateTax(sub, countyName);
        if (!taxData) {
          return null;
        }

        return {
          ...order,
          latitude: lat,
          longitude: lng,
          subtotal: sub,
          county_name: countyName,
          composite_tax_rate: taxData.composite_tax_rate,
          tax_amount: taxData.tax_amount,
          total_amount: taxData.total_amount,
          state_rate: taxData.breakdown.state_rate,
          county_rate: taxData.breakdown.county_rate,
          city_rate: taxData.breakdown.city_rate,
          special_rates: taxData.breakdown.special_rate,
          tax_breakdown: taxData.breakdown,
        };
      } catch (err) {
        console.warn(`[Import Warning]: Skipped row ${i} due to error: ${err.message}`);
        return null; 
      }
    })
    .filter(Boolean);

  if (processed.length === 0) {
    throw new Error('No valid orders found in the uploaded file. Check the format.');
  }

  const processedWithoutId = processed.map(({ id, ...rest }) => rest);
  
  return await Order.bulkCreate(processedWithoutId, {
    validate: true,
    returning: true,
  });
};
