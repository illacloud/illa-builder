import { HandlerTitleCSS } from "../style"
import { EventInstance } from "./EventInstance"

export const EventHandler = () => {
  return (
    <>
      <div>
        <div css={HandlerTitleCSS}>EVENT HANDLER</div>
        <EventInstance title="Success" />
        <EventInstance title="Failure" />
      </div>
    </>
  )
}
