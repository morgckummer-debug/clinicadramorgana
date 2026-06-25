import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidDateBR(ddmmaaaa: string): boolean {
  const digits = ddmmaaaa.replace(/\D/g, '')
  if (digits.length !== 8) return false
  const day = parseInt(digits.slice(0, 2), 10)
  const month = parseInt(digits.slice(2, 4), 10)
  const year = parseInt(digits.slice(4, 8), 10)
  if (month < 1 || month > 12) return false
  if (day < 1) return false
  if (year < 1900) return false
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return false
  return date <= new Date()
}

export function isValidDUM(ddmmaaaa: string): boolean {
  const digits = ddmmaaaa.replace(/\D/g, '')
  if (digits.length !== 8) return true
  const day = parseInt(digits.slice(0, 2), 10)
  const month = parseInt(digits.slice(2, 4), 10)
  const year = parseInt(digits.slice(4, 8), 10)
  const dum = new Date(year, month - 1, day)
  const diffDays = Math.floor((Date.now() - dum.getTime()) / 86400000)
  // Máximo 41 semanas = 287 dias
  return diffDays >= 0 && diffDays <= 287
}

export function isValidCPF(value: string): boolean {
  const digits = (value || '').replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  const calcCheck = (len: number) => {
    let sum = 0
    for (let i = 0; i < len; i++) {
      sum += parseInt(digits.charAt(i), 10) * (len + 1 - i)
    }
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  return calcCheck(9) === parseInt(digits.charAt(9), 10)
    && calcCheck(10) === parseInt(digits.charAt(10), 10)
}
