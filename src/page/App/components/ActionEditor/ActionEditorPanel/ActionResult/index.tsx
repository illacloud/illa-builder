import { FC, useRef, useState } from "react"
import { Alert } from "@illa-design/alert"
import { SuccessIcon, CloseIcon } from "@illa-design/icon"
import { useResize } from "@/utils/hooks/useResize"
import { EditorInput } from "@/components/EditorInput"
import {
  actionEditorPanelLayoutWrapper,
  applyContainerHeight,
  applyResizerStyle,
} from "@/page/Editor/components/ActionEditor/style"
import {
  resAlertBgcStyle,
  resCloseIconStyle,
  resStatusStyle,
  resTitleStyle,
} from "./style"
import { ActionResultProps } from "./interface"

export const ActionResult: FC<ActionResultProps> = (props) => {
  const layerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(182)

  const onHeightChange = (height: number) => {
    setContainerHeight(height)
  }

  const resizer = useResize("vertical", layerRef, onHeightChange)
  return (
    <div css={actionEditorPanelLayoutWrapper}>
      <div
        onMouseDown={resizer.onMouseDown}
        onTouchStart={resizer.onTouchStart}
        onTouchEnd={resizer.onMouseUp}
        css={applyResizerStyle(resizer.resizing, containerHeight)}
      />
      <div ref={layerRef} css={applyContainerHeight(containerHeight)}>
        <Alert
          _css={resAlertBgcStyle}
          icon={
            <div css={resStatusStyle}>
              <SuccessIcon />
            </div>
          }
          title={<span css={resTitleStyle}>action ran successfully</span>}
          closable
          closeElement={
            <div css={resCloseIconStyle}>
              <CloseIcon />
            </div>
          }
        />
        <EditorInput mode="javascript" />
      </div>
    </div>
  )
}

ActionResult.displayName = "ActionResult"
