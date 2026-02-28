import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import type { Order } from 'services/orders/types';
import { PAGE_SIZE_OPTIONS } from 'utils/constants';
import { useColumnConfig } from './useColumnConfig';
import ViewLocationModal from '../ViewLocationModal';

const OrdersDataTable = ({
  orders,
  pageSize,
  isLoading,
  totalRowCount,
  handlePageChange,
  page,
}: {
  orders: Order[];
  isLoading: boolean;
  totalRowCount: number;
  pageSize: number;
  page: number;
  handlePageChange: (model: { page: number; pageSize: number }) => void;
}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: page - 1,
    pageSize: pageSize,
  });

  const [mapModalData, setMapModalData] = useState<{
    open: boolean;
    lat: number;
    lng: number;
    countyName: string;
  }>({
    open: false,
    lat: 0,
    lng: 0,
    countyName: '',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPaginationModel({
      page: page - 1,
      pageSize: pageSize,
    });
  }, [page, pageSize]);

  const handlePaginationModelChange = (newModel: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationModel(newModel);
    handlePageChange(newModel);
  };

  const handleLocationClick = (
    lat: number,
    lng: number,
    countyName: string,
  ) => {
    setMapModalData({
      open: true,
      lat,
      lng,
      countyName,
    });
  };

  const rows = orders.map(order => ({ ...order }));

  const { columns, columnGroupingModel } = useColumnConfig({
    onLocationClick: handleLocationClick,
  });

  return (
    <>
      <ViewLocationModal
        open={mapModalData.open}
        onClose={() => setMapModalData(prev => ({ ...prev, open: false }))}
        position={
          mapModalData.open
            ? { lat: mapModalData.lat, lng: mapModalData.lng }
            : null
        }
        countyName={mapModalData.countyName}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        columnGroupingModel={columnGroupingModel}
        rowHeight={60}
        loading={isLoading}
        rowCount={totalRowCount}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={handlePaginationModelChange}
        disableRowSelectionOnClick
        autoHeight
        disableColumnMenu
        showColumnVerticalBorder
        showCellVerticalBorder
        localeText={{ noRowsLabel: `Sorry, we couldn't find any matches` }}
        sx={{
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus':
            {
              outline: 'none !important',
            },

          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f8f9fa',
          },

          '& .MuiDataGrid-columnHeader': {
            borderBottom: '1px solid #e0e0e0',
          },

          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600 !important',
          },

          '& .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitle':
            {
              fontWeight: '700 !important',
              color: '#333',
            },

          '& .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-columnHeaderTitleContainer':
            {
              justifyContent: 'center',
            },

          scrollbarWidth: 'thin',

          '& ::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '& ::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: '4px',
          },
          '& ::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: '4px',
          },
          '& ::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#a8a8a8',
          },
        }}
      />
    </>
  );
};

export default OrdersDataTable;
