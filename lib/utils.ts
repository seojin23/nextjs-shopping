import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatError = (error: unknown): string => {
  const e = error as {
    name?: string
    errors?: Record<string, { message?: string; path?: string }>
    message?: unknown
  }

  if (e.name === 'ZodError' && e.errors) {
    const fieldErrors = Object.keys(e.errors).map((field) => {
      const item = e.errors![field]
      const errorMessage = item?.message ?? String(item)
      const path = item?.path ?? field
      return `${path}: ${errorMessage}`
    })
    return fieldErrors.join('. ')
  } else if (e.name === 'ValidationError' && e.errors) {
    const fieldErrors = Object.keys(e.errors).map((field) => {
      const errorMessage = e.errors![field]?.message ?? String(e.errors![field])
      return errorMessage
    })
    return fieldErrors.join('. ')
  } else {
    if (typeof e.message === 'string') return e.message
    try {
      return JSON.stringify(e.message ?? error)
    } catch {
      return String(error)
    }
  }
}
