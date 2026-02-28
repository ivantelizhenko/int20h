import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImportOrdersModal from './ImportOrdersModal';
import useImportOrders from 'hooks/orders/useImportOrders';

const OrdersHeaderActions = ({ refetch }: { refetch: () => void }) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const { mutate: importOrders, isPending: isImportingOrders } =
    useImportOrders();

  const handleFileUpload = async (file: File) => {
    importOrders(file, {
      onSuccess: () => {
        refetch();
        setIsImportModalOpen(false);
      },
    });
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<UploadFileIcon />}
          onClick={() => setIsImportModalOpen(true)}
        >
          Import
        </Button>
        <Button
          component={Link}
          to="/orders/add-order"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Add Order
        </Button>
      </Stack>

      <ImportOrdersModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onUpload={handleFileUpload}
        isLoading={isImportingOrders}
      />
    </>
  );
};

export default OrdersHeaderActions;
