import { FC, HTMLAttributes, useState, useRef } from "react"
import { useVerticalResize } from "@/utils/hooks/useVerticalResize"
import { QueryList } from "./QueryList"
import { QueryEditorPanel } from "./QueryEditorPanel"
import {
  applyContainerHeight,
  applyResizerCss,
  QueryEditorContainer,
  QueryEditorPanelWrapper,
} from "./style"
import { FormContainer } from "./FormContainer"
import { QueryEditorProps } from "./interface"

export const QueryEditor: FC<QueryEditorProps> = (props) => {
  const { className } = props
  const [formVisible, setFormVisible] = useState(false)

  const [containerHeight, setContainerHeight] = useState(450)

  const editorRef = useRef<HTMLDivElement>(null)
  const onHeightChange = (height: number) => {
    setContainerHeight(height)
  }
  const onDragEnd = () => {}

  const resizer = useVerticalResize(editorRef, onHeightChange, onDragEnd)

  return (
    <div css={QueryEditorPanelWrapper}>
      <div
        onMouseDown={resizer.onMouseDown}
        onTouchStart={resizer.onTouchStart}
        onTouchEnd={resizer.onMouseUp}
        css={applyResizerCss(resizer.resizing, containerHeight)}
      ></div>
      <div
        className={className}
        css={[QueryEditorContainer, applyContainerHeight(containerHeight)]}
        ref={editorRef}
      >
        <QueryList />
        <QueryEditorPanel
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

QueryEditor.displayName = "QueryEditor"
