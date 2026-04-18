import type { Application } from "../types";
import { request } from "./apiWrapper";

export const createApplication = (productId: number) => {
  return request<Application>("/applications", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
};

export const getApplication = (id: string) =>
  request<Application>(`/applications/${id}`);

export const updateApplication = (id: string, payload: Partial<Application>) =>
  request<Application>(`/applications/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });