import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  class?: string
}

const DatePicker = (props: DatePickerProps) => {
  const [local, rest] = splitProps(props, ["value", "onChange", "class"])
  return (
    <input
      type="date"
      value={local.value}
      onChange={(e) => local.onChange?.(e.target.value)}
      class={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", local.class)}
      {...rest}
    />
  )
}

export { DatePicker }
