import { FC, useState, useRef } from "react"
import { css } from "@emotion/react"
import { useResize } from "@/utils/hooks/useResize"
import {
  applyContainerHeight,
  applyResizerStyle,
  actionEditorContainer,
  actionEditorPanelLayoutWrapper,
} from "./style"
import { ActionEditorLayoutProps } from "./interface"

export const ActionEditorLayout: FC<ActionEditorLayoutProps> = (props) => {
  const { actionList, actionEditorPanel, updateEditorHeight } = props
  const [containerHeight, setContainerHeight] = useState(300)
  updateEditorHeight?.(containerHeight)
  const editorRef = useRef<HTMLDivElement>(null)
  const onHeightChange = (height: number) => {
    setContainerHeight(height)
  }

  const resizer = useResize("vertical", editorRef, onHeightChange)

  return (
    <div css={actionEditorPanelLayoutWrapper}>
      <div
        onMouseDown={resizer.onMouseDown}
        onTouchStart={resizer.onTouchStart}
        onTouchEnd={resizer.onMouseUp}
        css={applyResizerStyle(resizer.resizing, containerHeight)}
      />
      <div
        css={css(actionEditorContainer, applyContainerHeight(containerHeight))}
        ref={editorRef}
      >
        {actionList}
        {actionEditorPanel}
      </div>
    </div>
  )
}

ActionEditorLayout.displayName = "ActionEditorLayout"
