import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addOrder } from 'services/orders/orders';

const useAddOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrder,
    onSuccess: async response => {
      if (response) {
        navigate('/orders');
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

      console.error('Error adding order', error);
    },
  });
};

export default useAddOrder;
