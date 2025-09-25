import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

interface AspectRatioProps {
  ratio?: number
  class?: string
  children: any
}

const AspectRatio = (props: AspectRatioProps) => {
  const [local, rest] = splitProps(props, ["ratio", "class", "children"])
  return (
    <div
      class={cn("relative w-full", local.class)}
      style={{ "padding-bottom": `${(1 / (local.ratio || 1)) * 100}%` }}
      {...rest}
    >
      <div class="absolute inset-0">{local.children}</div>
    </div>
  )
}

export { AspectRatio }