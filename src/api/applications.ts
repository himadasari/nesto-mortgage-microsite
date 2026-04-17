import type { Application } from "../types";
import { request } from "./apiWrapper";

export const createApplication = (productId: number) => {
  return request<Application>("/applications", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
};