import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApplication } from '../api/applications';

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplication,
    onSuccess: (data) => {
      queryClient.setQueryData(['application', data.id], data);
    },
  });
};
