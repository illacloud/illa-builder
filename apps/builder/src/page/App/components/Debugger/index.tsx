import { FC, HTMLAttributes, useCallback, useRef } from "react"
import { Divider } from "@illa-design/divider"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import {
  applyDebuggerStyle,
  errorContentStyle,
  errorIconStyle,
  errorItemStyle,
  nameStyle,
  sourceStyle,
  titleStyle,
} from "./style"
import { CloseIcon, ErrorIcon } from "@illa-design/icon"
import { useDispatch, useSelector } from "react-redux"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"
import { ErrorShape } from "@/redux/currentApp/executionTree/executionState"
import { isArray } from "@illa-design/system"
import { configActions } from "@/redux/config/configSlice"
import { isOpenDebugger } from "@/redux/config/configSelector"
import { getActionList } from "@/redux/currentApp/action/actionSelector"

const DebuggerDefaultHeight = 300

interface ErrorItemProps extends HTMLAttributes<HTMLDivElement> {
  displayName: string;
  item: ErrorShape
}

const ErrorItem: FC<ErrorItemProps> = (props) => {
  const { item, displayName } = props
  const dispatch = useDispatch()
  const actionList = useSelector(getActionList)
  const handleActionSelect = () => {
    const action = actionList.find(
      (item) => item.displayName === displayName.split(".")[0],
    )
    action && dispatch(configActions.updateSelectedAction(action))
  }

  return (
    <div>
      <div css={errorItemStyle}>
        <div>
          <ErrorIcon size={"16px"} css={errorIconStyle} />
          <span css={nameStyle} onClick={handleActionSelect}>[{displayName.split(".")[0]}]</span>
          <span>The value at {displayName.split(".")[1]} is invalid</span>
        </div>
        <div css={sourceStyle} onClick={handleActionSelect}>{displayName}</div>
      </div>
      <div><span>{item?.errorName}: {item?.errorMessage}</span></div>
    </div>
    )
}

export const Debugger: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const dispatch = useDispatch()
  const panelRef = useRef<HTMLDivElement>(null)
  const debuggerData = useSelector(getExecutionDebuggerData)
  const debuggerVisible = useSelector(isOpenDebugger)
  console.log(debuggerData, "debuggerData")

  const handleClickDebuggerIcon = useCallback(() => {
    dispatch(configActions.updateDebuggerVisible(!debuggerVisible))
  }, [debuggerVisible])

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
        <CloseIcon onClick={handleClickDebuggerIcon} />
      </div>
      <div css={errorContentStyle}>
        {
          Object.keys(debuggerData)?.map((name, index) => {
            const error = debuggerData[name]
            if (isArray(error)) {
              return error?.map((item) => {
                return <ErrorItem displayName={name} item={item} />
              })
            }
            return <ErrorItem displayName={name} item={error} />
          })
        }
      </div>
    </div>
  )
}

Debugger.displayName = "Debugger"
