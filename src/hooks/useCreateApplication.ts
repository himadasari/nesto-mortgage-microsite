import { useMutation } from "@tanstack/react-query";
import { createApplication } from "../api/applications";

export const useCreateApplication = () => {
  return useMutation({
    mutationFn: createApplication,
  });
};