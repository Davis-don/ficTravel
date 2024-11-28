import { useMutation } from 'react-query';

const useDeleteBooking = (onSuccess, onError) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:4000/delete-booking/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the booking");
      }

      return response.json(); 
    },
    onSuccess, 
    onError, 
  });
};

export default useDeleteBooking;
