import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import toast from 'react-hot-toast';

const NY_CENTER: [number, number] = [42.7, -75.5];
const NY_BOUNDS: L.LatLngBoundsExpression = [
  [40.4, -79.8],
  [45.1, -71.8],
];

interface MapPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (pos: { lat: number; lng: number }) => void;
  initialPosition?: { lat: number; lng: number } | null;
}

const LocationMarker = ({
  position,
  setPosition,
}: {
  position: { lat: number; lng: number } | null;
  setPosition: (pos: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    click(e) {
      const latBounds = [40.4, 45.1];
      const lngBounds = [-79.8, -71.8];

      if (
        e.latlng.lat >= latBounds[0] &&
        e.latlng.lat <= latBounds[1] &&
        e.latlng.lng >= lngBounds[0] &&
        e.latlng.lng <= lngBounds[1]
      ) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      } else {
        toast.error('Please select a location within New York State.');
      }
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

const MapPickerModal = ({
  open,
  onClose,
  onSubmit,
  initialPosition,
}: MapPickerModalProps) => {
  const [selectedPos, setSelectedPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPos(initialPosition || null);
    }
  }, [open, initialPosition]);

  const handleSubmit = () => {
    if (selectedPos) {
      onSubmit(selectedPos);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle fontWeight="bold">Pick Location on Map</DialogTitle>
      <DialogContent dividers sx={{ p: 0, height: 500 }}>
        {open && (
          <MapContainer
            center={
              initialPosition
                ? [initialPosition.lat, initialPosition.lng]
                : NY_CENTER
            }
            zoom={initialPosition ? 8 : 6}
            style={{ height: '100%', width: '100%' }}
            maxBounds={NY_BOUNDS}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker
              position={selectedPos}
              setPosition={setSelectedPos}
            />
          </MapContainer>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!selectedPos}
        >
          Accept Coordinates
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapPickerModal;
