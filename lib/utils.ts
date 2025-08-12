import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatDateToYMD(input: Date | string): string {
  if (input instanceof Date) {
    return input.toISOString().split('T')[0]
  }
  if (typeof input === 'string') {
    return input.split('T')[0]
  }
  return String(input)
}

export function formatTimeToHM(time: string): string {
  if (typeof time === 'string' && time.includes(':')) {
    return time.split(':').slice(0, 2).join(':')
  }
  return time
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}