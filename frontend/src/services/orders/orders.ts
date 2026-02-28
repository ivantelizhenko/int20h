import { getHeaders, handleJsonResponse } from 'services/helpers';
import type {
  AddOrderParams,
  GetOrdersParams,
  GetOrdersResponse,
} from './types';

export const getOrders = async ({
  page,
  pageSize,
  ...filters
}: GetOrdersParams): Promise<GetOrdersResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', pageSize.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const url = `api/orders?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    return await handleJsonResponse(response);
  } catch (error) {
    console.error('Error fetching orders:', error);

    throw error;
  }
};

export const addOrder = async (
  postData: AddOrderParams,
): Promise<GetOrdersResponse> => {
  try {
    const url = `api/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });

    return await handleJsonResponse(response);
  } catch (error) {
    console.error('Error fetching orders:', error);

    throw error;
  }
};

export const importOrders = async (
  file: File,
): Promise<{ message: string }> => {
  try {
    const url = `api/orders/import`;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    return await handleJsonResponse(response);
  } catch (error) {
    console.error('Error uploading orders file:', error);
    throw error;
  }
};
