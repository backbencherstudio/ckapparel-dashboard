import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}




// Format currency
export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};



export function buildApiParams<T extends Record<string, unknown>>(params?: T): Partial<T> {
  if (!params) return {} as Partial<T>;
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== "" && v !== "all")
  ) as Partial<T>;
}