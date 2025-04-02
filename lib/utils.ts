import { config } from "@/config"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:4000${path}`
    : `https://${config.appUrl}${path}`
}

export function camelToNormalCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Adds space between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Separates acronyms from words
    .replace(/(\d+)([A-Za-z])/g, "$1 $2") // Separates numbers from letters
    .replace(/([A-Za-z])(\d+)/g, "$1 $2") // Separates letters from numbers
    .toLowerCase()
    .replace(/^./, (match) => match.toUpperCase()) // Capitalize the first letter
}
