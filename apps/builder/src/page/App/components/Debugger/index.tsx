import { FC, HTMLAttributes, useRef } from "react"
import { Divider } from "@illa-design/divider"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { applyDebuggerStyle, errorIconStyle, errorItemStyle, nameStyle, sourceStyle, titleStyle } from "./style"
import { CloseIcon, ErrorIcon } from "@illa-design/icon"
import { useSelector } from "react-redux"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"
import { forIn } from "lodash"
import { ErrorShape } from "@/redux/currentApp/executionTree/executionState"
import { isArray } from "@illa-design/system"

const DebuggerDefaultHeight = 300

interface ErrorItemProps extends HTMLAttributes<HTMLDivElement> {
  displayName: string;
  item: ErrorShape
}
const ErrorItem: FC<ErrorItemProps> = (props) => {
  const { item, displayName } = props
  return <div css={errorItemStyle}>
    <div>
      <ErrorIcon size={"16px"} css={errorIconStyle} />
      <span css={nameStyle}>[{displayName}]</span>
      <span>{item?.errorMessage}</span>
    </div>
    <div css={sourceStyle}>{displayName}</div>
  </div>
}

export const Debugger: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const debuggerData = useSelector(getExecutionDebuggerData)
  console.log(debuggerData, 'debuggerData')
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

      {
        Object.keys(debuggerData)?.map((name, index) => {
          const error = debuggerData[name]
          console.log(name, error, 'debuggerData error')
          if (isArray(error)) {
            return error?.map((item) =>{
              console.log('debuggerData item', item)
             return  <ErrorItem displayName={name} item={item} />
            })
          }
          return <ErrorItem displayName={name} item={error} />
        })
      }

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
