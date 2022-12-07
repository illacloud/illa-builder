import { FC, HTMLAttributes, useRef, useState } from "react"
import { Divider } from "@illa-design/react"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { FocusManager } from "@/utils/focusManager"
import { ActionList } from "./ActionList"
import { ActionPanel } from "./ActionPanel"
import { applyActionEditorStyle, contentContainerStyle } from "./styles"
import { ActionPanelFunctionProps } from "@/page/App/components/Actions/ActionPanel/interface"

const ActionEditorDefaultHeight = 300

export const ActionEditor: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const actionPanelFuncRef = useRef<ActionPanelFunctionProps>({})
  const [maxHeight, setMaxHeight] = useState<number>()

  const onChangeSelectedAction = () => {
    actionPanelFuncRef.current?.clearActionResult?.()
  }

  return (
    <div
      className={props.className}
      css={applyActionEditorStyle(ActionEditorDefaultHeight)}
      ref={(ele) => {
        panelRef.current = ele
        if (ele?.offsetHeight) {
          setMaxHeight(ele?.offsetHeight - 100)
        }
      }}
      onClick={() => {
        FocusManager.switchFocus("action")
      }}
    >
      <DragBar
        resizeRef={panelRef}
        minHeight={ActionEditorDefaultHeight}
        onChange={() => {
          if (panelRef.current?.offsetHeight) {
            setMaxHeight(panelRef.current?.offsetHeight - 100)
          }
        }}
      />
      <Divider direction="horizontal" />
      <div css={contentContainerStyle}>
        <ActionList onChangeSelectedAction={onChangeSelectedAction} />
        <ActionPanel ref={actionPanelFuncRef} maxHeight={maxHeight} />
      </div>
    </div>
  )
}

ActionEditor.displayName = "ActionEditor"
