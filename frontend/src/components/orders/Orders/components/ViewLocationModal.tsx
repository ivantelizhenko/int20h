import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ViewLocationModalProps {
  open: boolean;
  onClose: () => void;
  position: { lat: number; lng: number } | null;
  countyName: string;
}

const NY_BOUNDS: L.LatLngBoundsExpression = [
  [40.4, -79.8],
  [45.1, -71.8],
];

const ViewLocationModal = ({
  open,
  onClose,
  position,
  countyName,
}: ViewLocationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle fontWeight="bold">
        Location: {countyName || 'Unknown County'}
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, height: 500 }}>
        {open && position && (
          <MapContainer
            center={[position.lat, position.lng]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            maxBounds={NY_BOUNDS}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[position.lat, position.lng]} />
          </MapContainer>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewLocationModal;
