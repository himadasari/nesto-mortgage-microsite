import { useQuery } from "@tanstack/react-query";
import { getApplication } from "../api/applications";

export const useApplication = (id: string) =>
  useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplication(id),
    enabled: !!id,
  });