import type { PageParams } from 'services/common';

export interface OrderFilters {
  id?: string;
  min_total?: string;
  max_total?: string;
  start_date?: string;
  end_date?: string;
  has_special_rates?: boolean;
  county_name?: string;
}

export type GetOrdersParams = PageParams & OrderFilters;

export type GetOrdersResponse = {
  data: {
    data: Order[];
    total: number;
    pageSize: number;
    page: number;
    totalPages: number;
  };
  message: string;
};

export type Order = {
  city_rate: string;
  composite_tax_rate: string;
  county_name: string;
  county_rate: string;
  id: number;
  latitude: string;
  longitude: string;
  special_rates: string;
  state_rate: string;
  subtotal: string;
  tax_amount: string;
  timestamp: string;
  total_amount: string;
};

export type AddOrderParams = {
  latitude: number;
  longitude: number;
  subtotal: number;
};
