// import {Order} from '../db/models/OrderModel.js'

async function pagination(
  model,
  page = 1,
  limit = 5,
  where = {},
  order = [["id", "ASC"]],
  options = {},
) {
  const offset = (page - 1) * limit;

  const { count, rows } = await model.findAndCountAll({
    where,
    limit,
    offset,
    order,
    ...options,
  });

  return {
    total: count,
    totalPages: Math.ceil(count / limit),
    page,
    pageSize: limit,
    data: rows,
  };
}

export default pagination;
