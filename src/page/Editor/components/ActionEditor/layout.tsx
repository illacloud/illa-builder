import { FC, useState, useRef } from "react"
import { useResize } from "@/utils/hooks/useResize"
import {
  applyContainerHeight,
  applyresizerStyle,
  ActionEditorContainer,
  ActionEditorPanelLayoutWrapper,
} from "./style"
import { ActionEditorLayoutProps } from "./interface"

export const ActionEditorLayout: FC<ActionEditorLayoutProps> = (props) => {
  const { actionList, actionEditorPanel } = props
  const [containerHeight, setContainerHeight] = useState(300)

  const editorRef = useRef<HTMLDivElement>(null)
  const onHeightChange = (height: number) => {
    setContainerHeight(height)
  }

  const resizer = useResize("vertical", editorRef, onHeightChange)

  return (
    <div css={ActionEditorPanelLayoutWrapper}>
      <div
        onMouseDown={resizer.onMouseDown}
        onTouchStart={resizer.onTouchStart}
        onTouchEnd={resizer.onMouseUp}
        css={applyresizerStyle(resizer.resizing, containerHeight)}
      />
      <div
        css={[ActionEditorContainer, applyContainerHeight(containerHeight)]}
        ref={editorRef}
      >
        {actionList}
        {actionEditorPanel}
      </div>
    </div>
  )
}

ActionEditorLayout.displayName = "ActionEditorLayout"
