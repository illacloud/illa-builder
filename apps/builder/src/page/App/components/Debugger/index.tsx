import { FC, HTMLAttributes, useRef } from "react"
import { Divider } from "@illa-design/divider"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { applyDebuggerStyle } from "./style"

const DebuggerDefaultHeight = 300

export const Debugger: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const panelRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={props.className}
      css={applyDebuggerStyle(DebuggerDefaultHeight)}
      ref={panelRef}
    >
      <DragBar resizeRef={panelRef} minHeight={DebuggerDefaultHeight} />
      <Divider direction="horizontal" />
      <div>
        123123243252345234565
      </div>
    </div>
  )
}

Debugger.displayName = "Debugger"
