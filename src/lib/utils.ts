import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateKey() {
  return v4();
}

export function formatCardExpiryMonth(month: number) {
  return month < 10 ? `0${month}` : month;
}