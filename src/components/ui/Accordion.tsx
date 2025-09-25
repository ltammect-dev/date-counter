import { createMemo } from "solid-js"
import { createStore } from "solid-js/store"
import { cn } from "~/lib/utils"

// Global reactive state for accordion items
const [accordionStates, setAccordionStates] = createStore<Record<string, boolean>>({})

interface AccordionProps {
  children: any
  class?: string
  multiple?: boolean
  collapsible?: boolean
}

interface AccordionItemProps {
  value: string
  trigger: any
  content: any
  class?: string
}

interface AccordionTriggerProps {
  children: any
  class?: string
}

interface AccordionContentProps {
  children: any
  class?: string
}

const Accordion = (props: AccordionProps) => {
  return (
    <div class={cn("space-y-2", props.class)}>
      {props.children}
    </div>
  )
}

const AccordionItem = (props: AccordionItemProps) => {
  // Use global reactive state for persistence across re-renders
  const isOpen = createMemo(() => accordionStates[props.value] ?? false)

  const toggle = () => {
    const currentState = accordionStates[props.value] ?? false
    setAccordionStates(props.value, !currentState)
  }

  return (
    <div class={cn("", props.class)}>
      <div
        class={cn("cursor-pointer")}
        onClick={toggle}
      >
        {props.trigger}
      </div>
      {isOpen() && (
        <div class={cn("mt-2 transition-all duration-300 ease-in-out")}>
          {props.content}
        </div>
      )}
    </div>
  )
}

const AccordionTrigger = (props: AccordionTriggerProps) => {
  return (
    <div class={cn("flex items-center justify-between", props.class)}>
      {props.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 transition-transform duration-200 ease-in-out"
        style={{ transform: "rotate(0deg)" }}
      >
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </div>
  )
}

const AccordionContent = (props: AccordionContentProps) => {
  return (
    <div class={cn("", props.class)}>
      {props.children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
