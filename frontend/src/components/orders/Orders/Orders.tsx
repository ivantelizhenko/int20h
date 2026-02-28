import { Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import useOrders from 'hooks/orders/useOrders';
import LoaderBox from 'components/common/loaders/LoaderBox';
import OrdersDataTable from './components/OrderDataTable';
import OrdersHeaderActions from './components/OrderHeaderActions';
import EmptyListPage from 'components/common/EmptyList';
import Filters from './components/Filters';

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('limit')) || 10;

  const queryFilters = {
    id: searchParams.get('id') || '',
    min_total: searchParams.get('min_total') || '',
    max_total: searchParams.get('max_total') || '',
    start_date: searchParams.get('start_date') || '',
    end_date: searchParams.get('end_date') || '',
    has_special_rates: searchParams.get('has_special_rates') === 'true',
    county_name: searchParams.get('county_name') || '',
  };

  const { data, isPending, isError, error, isRefetching, refetch } = useOrders({
    page,
    pageSize,
    ...queryFilters,
  });

  const orders = data?.data?.data ?? [];
  const totalRowCount = data?.data?.total ?? 0;

  const handlePageChange = (model: { page: number; pageSize: number }) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', (model.page + 1).toString());
    newParams.set('limit', model.pageSize.toString());
    setSearchParams(newParams);
  };

  const hasOrders = !isPending && orders.length > 0;
  const hasActiveFilters = Boolean(
    queryFilters.id ||
    queryFilters.min_total ||
    queryFilters.max_total ||
    queryFilters.start_date ||
    queryFilters.end_date ||
    queryFilters.has_special_rates ||
    queryFilters.county_name,
  );

  const renderContent = () => {
    if (isError) {
      return (
        <EmptyListPage
          title="Oops! Something went wrong"
          message={
            error?.message ??
            'We could not fetch the orders. Please try again later.'
          }
        />
      );
    }

    if (hasOrders || hasActiveFilters) {
      return (
        <OrdersDataTable
          orders={orders}
          page={page}
          totalRowCount={totalRowCount}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          isLoading={isRefetching}
        />
      );
    }

    return (
      <EmptyListPage
        title="No Orders Yet"
        message="Your database is completely empty. Import a CSV file or add a new order manually to get started."
      />
    );
  };

  return (
    <LoaderBox loading={isPending}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        sx={{ my: 3 }}
      >
        <OrdersHeaderActions refetch={refetch} />
      </Stack>

      <Filters />

      {renderContent()}
    </LoaderBox>
  );
};

export default Orders;
