import { FC, HTMLAttributes, useRef } from "react"
import { Divider } from "@illa-design/divider"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { applyDebuggerStyle, errorIconStyle, errorItemStyle, nameStyle, sourceStyle, titleStyle } from "./style"
import { CloseIcon, ErrorIcon } from "@illa-design/icon"

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
      <div css={titleStyle}>
        <span>Errors</span>
        <CloseIcon />
      </div>
      <div css={errorItemStyle}>
        <div>
          <ErrorIcon size={"16px"} css={errorIconStyle} />
          <span css={nameStyle}>[updateCustomerInfo]</span>
          <span>The value at config.body is invalid</span>
        </div>
        <div css={sourceStyle}>updateCustomerInfo.action</div>
      </div>
    </div>
  )
}

Debugger.displayName = "Debugger"
