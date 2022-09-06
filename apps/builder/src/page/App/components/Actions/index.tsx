import { FC, HTMLAttributes, useRef } from "react"
import { ActionList } from "./ActionList"
import { ActionPanel } from "./ActionPanel"
import { applyActionEditorStyle, contentContainerStyle } from "./styles"
import { Divider } from "@illa-design/divider"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { FocusManager } from "@/utils/focusManager"

const ActionEditorDefaultHeight = 300

export const ActionEditor: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const panelRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={props.className}
      css={applyActionEditorStyle(ActionEditorDefaultHeight)}
      ref={panelRef}
      onFocus={() => {
        FocusManager.switchFocus("action")
      }}
    >
      <DragBar resizeRef={panelRef} minHeight={ActionEditorDefaultHeight} />
      <Divider direction="horizontal" />
      <div css={contentContainerStyle}>
        <ActionList />
        <ActionPanel />
      </div>
    </div>
  )
}

ActionEditor.displayName = "ActionEditor"
