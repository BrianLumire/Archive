import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { baseUrl } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const urlBuilder = (url?: string) => {
  if (!url) return "";
  const badUrl = url;
  const newUrl = badUrl.replace("http://localhost:8032", baseUrl);
  return newUrl;
};
