import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidDateBR(value: string): boolean {
  const digits = (value || '').replace(/\D/g, '')
  if (digits.length !== 8) return false
  const d = parseInt(digits.slice(0, 2), 10)
  const m = parseInt(digits.slice(2, 4), 10)
  const y = parseInt(digits.slice(4, 8), 10)
  if (m < 1 || m > 12) return false
  const dt = new Date(y, m - 1, d)
  return (
    dt.getFullYear() === y &&
    dt.getMonth() === m - 1 &&
    dt.getDate() === d
  )
}

export function isValidDUM(value: string): boolean {
  if (!isValidDateBR(value)) return false
  const digits = value.replace(/\D/g, '')
  const d = parseInt(digits.slice(0, 2), 10)
  const m = parseInt(digits.slice(2, 4), 10)
  const y = parseInt(digits.slice(4, 8), 10)
  const dt = new Date(y, m - 1, d)
  const now = new Date()
  const diffDays = (now.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays >= 0 && diffDays <= 300
}

export function isValidCPF(value: string): boolean {
  const cpf = (value || '').replace(/\D/g, '')
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i)
  let rev = 11 - (sum % 11)
  if (rev >= 10) rev = 0
  if (rev !== parseInt(cpf[9])) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i)
  rev = 11 - (sum % 11)
  if (rev >= 10) rev = 0
  return rev === parseInt(cpf[10])
}
