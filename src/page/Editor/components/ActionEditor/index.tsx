import { FC, useState, useRef } from "react"
import { useResize } from "@/utils/hooks/useResize"
import { QueryList } from "./QueryList"
import { ActionEditorPanel } from "./ActionEditorPanel"
import {
  applyContainerHeight,
  applyResizerCss,
  ActionEditorContainer,
  ActionEditorPanelWrapper,
} from "./style"
import { FormContainer } from "./FormContainer"
import { ActionEditorProps } from "./interface"
import { ActionType } from "@/page/Editor/components/ActionEditor/FormContainer/interface"

export const ActionEditor: FC<ActionEditorProps> = (props) => {
  const { className } = props
  const [formVisible, setFormVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>("select")

  const [containerHeight, setContainerHeight] = useState(300)

  const editorRef = useRef<HTMLDivElement>(null)
  const onHeightChange = (height: number) => {
    setContainerHeight(height)
  }
  const onDragEnd = () => {}

  const resizer = useResize("vertical", editorRef, onHeightChange, onDragEnd)

  return (
    <div css={ActionEditorPanelWrapper}>
      <div
        onMouseDown={resizer.onMouseDown}
        onTouchStart={resizer.onTouchStart}
        onTouchEnd={resizer.onMouseUp}
        css={applyResizerCss(resizer.resizing, containerHeight)}
      />
      <div
        className={className}
        css={[ActionEditorContainer, applyContainerHeight(containerHeight)]}
        ref={editorRef}
      >
        <QueryList />
        <ActionEditorPanel
          onCreateResource={() => {
            setActionType("select")
            setFormVisible(true)
          }}
          onEditResource={() => {
            setActionType("edit")
            setFormVisible(true)
          }}
        />
        <FormContainer
          visible={formVisible}
          actionType={actionType}
          onCancel={() => setFormVisible(false)}
        />
      </div>
    </div>
  )
}

ActionEditor.displayName = "ActionEditor"
