import { useQuery } from '@tanstack/react-query';
import { getApplications } from '../api/applications';

export const useApplications = () =>
  useQuery({
    queryKey: ['application'],
    queryFn: () => getApplications(),
  });
