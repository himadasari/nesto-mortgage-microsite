import { useMutation } from "@tanstack/react-query";
import { updateApplication } from "../api/applications";
import type { Application } from "../types";

export const useUpdateApplication = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Application> }) =>
      updateApplication(id, data),
  });