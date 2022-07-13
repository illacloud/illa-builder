import { FC } from "react"
import { emptyBodyStyle } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/style"

export const EventHandlerEmpty: FC = () => {
  return (
    <div css={emptyBodyStyle}>
      Trigger queries, control components, or call other APIs in response to
      component events.
    </div>
  )
}

EventHandlerEmpty.displayName = "EventHandlerEmpty"
