import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import {
  type GridColDef,
  type GridColumnGroupingModel,
} from '@mui/x-data-grid';
import { format } from 'date-fns';
import { formatCurrency, formatPercent } from 'utils/helpers';
import MapIcon from '@mui/icons-material/Map';

export const useColumnConfig = ({
  onLocationClick,
}: {
  onLocationClick: (lat: number, lng: number, countyName: string) => void;
}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 90 },
    {
      field: 'timestamp',
      headerName: 'Date',
      width: 150,
      valueFormatter: (value: string | number) => {
        if (!value) return '';
        return format(new Date(value), 'MMM dd, yyyy HH:mm');
      },
    },
    {
      field: 'location',
      headerName: 'Location (County & Coords)',
      flex: 1.5,
      minWidth: 200,
      renderCell: params => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Розносимо текст і кнопку
            height: '100%',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: 1.2, mb: 0.25 }}
            >
              {params.row.county_name || 'Unknown County'}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ lineHeight: 1 }}
            >
              {params.row.latitude}, {params.row.longitude}
            </Typography>
          </Box>

          <Tooltip title="View on map">
            <IconButton
              size="small"
              color="primary"
              onClick={() =>
                onLocationClick(
                  Number(params.row.latitude),
                  Number(params.row.longitude),
                  params.row.county_name,
                )
              }
            >
              <MapIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: 'state_rate',
      headerName: 'State',
      width: 90,
      type: 'number',
      valueFormatter: formatPercent,
    },
    {
      field: 'county_rate',
      headerName: 'County',
      width: 90,
      type: 'number',
      valueFormatter: formatPercent,
    },
    {
      field: 'city_rate',
      headerName: 'City',
      width: 90,
      type: 'number',
      valueFormatter: formatPercent,
    },
    {
      field: 'special_rates',
      headerName: 'Special',
      width: 90,
      type: 'number',
      valueFormatter: formatPercent,
    },
    {
      field: 'composite_tax_rate',
      headerName: 'Total Rate',
      width: 110,
      type: 'number',
      valueFormatter: formatPercent,
      renderCell: params => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            width: '100%',
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {formatPercent(params.value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 110,
      type: 'number',
      valueFormatter: formatCurrency,
    },
    {
      field: 'tax_amount',
      headerName: 'Tax Amount',
      width: 110,
      type: 'number',
      valueFormatter: formatCurrency,
      renderCell: params => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            width: '100%',
          }}
        >
          <Typography variant="body2" color="error.main">
            +{formatCurrency(params.value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'total_amount',
      headerName: 'Total',
      width: 120,
      type: 'number',
      valueFormatter: formatCurrency,
      renderCell: params => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            width: '100%',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(params.value)}
          </Typography>
        </Box>
      ),
    },
  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: 'order_info',
      headerName: 'Order Details',
      headerAlign: 'center',
      children: [
        { field: 'id' },
        { field: 'timestamp' },
        { field: 'location' },
      ],
    },
    {
      groupId: 'tax_breakdown',
      headerName: 'Tax Rate Breakdown',
      headerAlign: 'center',
      children: [
        { field: 'state_rate' },
        { field: 'county_rate' },
        { field: 'city_rate' },
        { field: 'special_rates' },
        { field: 'composite_tax_rate' },
      ],
    },
    {
      groupId: 'financials',
      headerName: 'Order Financials',
      headerAlign: 'center',
      children: [
        { field: 'subtotal' },
        { field: 'tax_amount' },
        { field: 'total_amount' },
      ],
    },
  ];

  return { columns, columnGroupingModel };
};
