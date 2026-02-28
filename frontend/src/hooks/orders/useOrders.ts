import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getOrders } from 'services/orders/orders';
import type { GetOrdersParams, GetOrdersResponse } from 'services/orders/types';

type HookResponse = GetOrdersResponse | undefined;

const useOrders = (params: GetOrdersParams) => {
  return useQuery<HookResponse>({
    queryKey: ['orders', params],
    queryFn: async () => await getOrders(params),
    enabled: !!params.pageSize && !!params.page,
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export default useOrders;
