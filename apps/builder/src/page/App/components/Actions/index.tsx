import { FC, HTMLAttributes, useRef } from "react"
import { Divider } from "@illa-design/react"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { FocusManager } from "@/utils/focusManager"
import { ActionList } from "./ActionList"
import { ActionPanel } from "./ActionPanel"
import { applyActionEditorStyle, contentContainerStyle } from "./styles"

const ActionEditorDefaultHeight = 300

export const ActionEditor: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const panelRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      className={props.className}
      css={applyActionEditorStyle(ActionEditorDefaultHeight)}
      onClick={() => {
        FocusManager.switchFocus("action")
      }}
      ref={panelRef}
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
