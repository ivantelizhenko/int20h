import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import toast from 'react-hot-toast';

interface ImportOrdersModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

const ImportOrdersModal = ({
  open,
  onClose,
  onUpload,
  isLoading,
}: ImportOrdersModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [open]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (
        file.type === 'text/csv' ||
        file.name.toLowerCase().endsWith('.csv')
      ) {
        setSelectedFile(file);
      } else {
        toast.error('Please select a valid CSV file.');
        event.target.value = '';
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Import Orders</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload a CSV file containing your orders. Make sure it includes
          latitude, longitude, and subtotal columns.
        </Typography>

        <Box
          sx={{
            border: '2px dashed',
            borderColor: selectedFile ? 'primary.main' : 'divider',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            backgroundColor: selectedFile ? 'primary.50' : 'background.default',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            pointerEvents: isLoading ? 'none' : 'auto',

            '&:hover': {
              borderColor: isLoading ? 'divider' : 'primary.main',
              backgroundColor: isLoading
                ? selectedFile
                  ? 'primary.50'
                  : 'background.default'
                : 'primary.50',
            },
          }}
          onClick={() => !isLoading && fileInputRef.current?.click()}
        >
          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept=".csv, text/csv"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          <CloudUploadIcon
            sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }}
          />
          {selectedFile ? (
            <Typography variant="body1" fontWeight="500" color="primary.main">
              Selected: {selectedFile.name}
            </Typography>
          ) : (
            <>
              <Typography variant="body1" fontWeight="500">
                Click to browse or drag and drop
              </Typography>
              <Typography variant="caption" color="text.secondary">
                CSV up to 5MB
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={handleClose} color="inherit" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload File'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportOrdersModal;
