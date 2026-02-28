import { Op } from "sequelize";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

export default function buildFilterQuery(filters) {
  const where = {};
  if (filters.min_total) {
    where.total_amount = {
      ...where.total_amount,
      [Op.gte]: parseFloat(filters.min_total),
    };
  }

  if (filters.max_total) {
    where.total_amount = {
      ...where.total_amount,
      [Op.lte]: parseFloat(filters.max_total),
    };
  }

  if (filters.id) {
    where.id = parseInt(filters.id, 10);
  }

  if (filters.county_name) {
    where.county_name = {
      [Op.iLike]: `%${filters.county_name}%`, 
    };
  }
  
  if (filters.start_date || filters.end_date) {
    where.timestamp = where.timestamp || {};

    if (filters.start_date) {
      const start = dayjs.utc(filters.start_date);
      if (start.isValid()) {
        where.timestamp[Op.gte] = start.startOf("day").toDate();
      }
    }

    if (filters.end_date) {
      const end = dayjs.utc(filters.end_date);
      if (end.isValid()) {
        where.timestamp[Op.lte] = end.endOf("day").toDate();
      }
    }
  }

  const hasSpecialFilter = filters.has_special_rates?.toString().toLowerCase();
  if (hasSpecialFilter === "true") {
    where.special_rates = { [Op.gt]: 0 };
  }
  return where;
}
