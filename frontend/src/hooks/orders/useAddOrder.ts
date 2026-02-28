import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addOrder } from 'services/orders/orders';

const useAddOrder = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addOrder,
    onSuccess: response => {
      if (response) {
        navigate('/orders');
        toast.success(response.message);
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
