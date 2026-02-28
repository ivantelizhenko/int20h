import {
  Button,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Filters = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const [localState, setLocalState] = useState({
    id: searchParams.get('id') || '',
    start_date: searchParams.get('start_date') || '',
    end_date: searchParams.get('end_date') || '',
    min_total: searchParams.get('min_total') || '',
    max_total: searchParams.get('max_total') || '',
    has_special_rates: searchParams.get('has_special_rates') === 'true',
    county_name: searchParams.get('county_name') || '',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalState({
      id: searchParams.get('id') || '',
      start_date: searchParams.get('start_date') || '',
      end_date: searchParams.get('end_date') || '',
      min_total: searchParams.get('min_total') || '',
      max_total: searchParams.get('max_total') || '',
      has_special_rates: searchParams.get('has_special_rates') === 'true',
      county_name: searchParams.get('county_name') || '',
    });
  }, [searchParams]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setLocalState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();

    newParams.set('page', '1');

    const currentLimit = searchParams.get('limit');
    if (currentLimit) newParams.set('limit', currentLimit);

    Object.entries(localState).forEach(([key, value]) => {
      if (value !== '' && value !== false) {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setLocalState({
      id: '',
      start_date: '',
      end_date: '',
      min_total: '',
      max_total: '',
      has_special_rates: false,
      county_name: '',
    });

    const currentLimit = searchParams.get('limit');
    const newParams = new URLSearchParams();
    if (currentLimit) newParams.set('limit', currentLimit);
    newParams.set('page', '1');

    setSearchParams(newParams);
  };

  return (
    <Accordion
      sx={{
        mb: 3,
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          mt: 0,
          mb: 3,
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" spacing={1} alignItems="center">
          <FilterAltIcon color="action" />

          <Typography fontWeight="500">Filter Orders</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 2, pb: 3, px: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Order ID"
              name="id"
              value={localState.id}
              onChange={handleFilterChange}
              placeholder="e.g. 12345"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="County Name"
              name="county_name"
              value={localState.county_name}
              onChange={handleFilterChange}
              placeholder="e.g. Greene"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Start Date"
              type="date"
              name="start_date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={localState.start_date}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="End Date"
              type="date"
              name="end_date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={localState.end_date}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Min Total ($)"
              type="number"
              name="min_total"
              value={localState.min_total}
              onChange={handleFilterChange}
              placeholder="0.00"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Max Total ($)"
              type="number"
              name="max_total"
              value={localState.max_total}
              onChange={handleFilterChange}
              placeholder="0.00"
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="has_special_rates"
                  checked={localState.has_special_rates}
                  onChange={handleFilterChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" fontWeight="500">
                  Show only with Special Rates
                </Typography>
              }
            />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 4 }}
        >
          <Button variant="outlined" color="inherit" onClick={clearFilters}>
            Clear All
          </Button>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Filters;
