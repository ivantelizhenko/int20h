import useAddOrder from 'hooks/orders/useAddOrder';
import { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MapIcon from '@mui/icons-material/Map';
import MapPickerModal from '../Orders/components/MapPickerModal';

const AddOrder = () => {
  const navigate = useNavigate();

  const { mutate: addOrder, isPending: isAddingOrder } = useAddOrder();

  const [formData, setFormData] = useState<{
    latitude: string;
    longitude: string;
    subtotal: string;
  }>({
    latitude: '',
    longitude: '',
    subtotal: '',
  });

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMapSubmit = (pos: { lat: number; lng: number }) => {
    setFormData(prev => ({
      ...prev,
      latitude: pos.lat.toFixed(6),
      longitude: pos.lng.toFixed(6),
    }));
    setIsMapModalOpen(false);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataToSubmit = {
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      subtotal: Number(formData.subtotal),
    };

    addOrder(dataToSubmit);
  };

  const onCancel = () => {
    navigate('/orders');
  };

  const currentLat = Number(formData.latitude);
  const currentLng = Number(formData.longitude);
  const initialPosition =
    !isNaN(currentLat) &&
    !isNaN(currentLng) &&
    formData.latitude !== '' &&
    formData.longitude !== ''
      ? { lat: currentLat, lng: currentLng }
      : null;

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ my: 2 }}
      >
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to="/orders"
        >
          Orders
        </Link>
        <Typography color="text.primary" fontWeight="500">
          Add Order
        </Typography>
      </Breadcrumbs>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 1000,
          mx: 'auto',
          py: 3,
          px: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.02)',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography variant="h6" fontWeight="bold">
            Location & Order Details
          </Typography>

          <Button
            variant="outlined"
            startIcon={<MapIcon />}
            onClick={() => setIsMapModalOpen(true)}
          >
            Pick from Map
          </Button>
        </Stack>

        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Latitude"
              name="latitude"
              type="number"
              value={formData.latitude}
              onChange={handleChange}
              required
              fullWidth
              slotProps={{ htmlInput: { step: 'any', min: 40.4, max: 45.1 } }}
            />

            <TextField
              label="Longitude"
              name="longitude"
              type="number"
              value={formData.longitude}
              onChange={handleChange}
              required
              fullWidth
              slotProps={{ htmlInput: { step: 'any', min: -79.8, max: -71.8 } }}
            />
          </Stack>

          <TextField
            label="Subtotal ($)"
            name="subtotal"
            type="number"
            value={formData.subtotal}
            onChange={handleChange}
            required
            fullWidth
            slotProps={{ htmlInput: { step: '0.01', min: 0 } }}
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 2 }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={onCancel}
              disabled={isAddingOrder}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isAddingOrder}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>

      <MapPickerModal
        open={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onSubmit={handleMapSubmit}
        initialPosition={initialPosition}
      />
    </>
  );
};

export default AddOrder;
