import clsx, { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customMerge = extendTailwindMerge({ classGroups: {} });

export function cn(...classes: ClassValue[]) {
    return customMerge(clsx(classes));
}
