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

export const ActionEditor: FC<ActionEditorProps> = (props) => {
  const { className } = props
  const [formVisible, setFormVisible] = useState(false)

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
          onCreateResource={() => setFormVisible(true)}
          onEditResource={() => setFormVisible(true)}
        />
        <FormContainer
          visible={formVisible}
          actionType={"select"}
          onCancel={() => setFormVisible(false)}
        />
      </div>
    </div>
  )
}

ActionEditor.displayName = "ActionEditor"
