import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const customMerge = extendTailwindMerge({ classGroups: {} })

export function cn(...inputs: ClassValue[]) {
  return customMerge(clsx(inputs))
}