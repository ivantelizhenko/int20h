import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { importOrders } from 'services/orders/orders';

const useImportOrders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importOrders,
    onSuccess: async response => {
      if (response) {
        toast.success(response.message);

        await queryClient.invalidateQueries({
          queryKey: ['orders'],
        });
      }
    },
    onError: error => {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      console.error('Error import orders', error);
    },
  });
};

export default useImportOrders;
