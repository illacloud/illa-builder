import { FC, useRef, useState, useContext } from "react"
import { css } from "@emotion/react"
import { RightIcon, CloseIcon } from "@illa-design/icon"
import { useResize } from "@/utils/hooks/useResize"
import { EditorInput } from "@/components/EditorInput"
import {
  actionEditorPanelLayoutWrapper,
  applyContainerHeight,
  applyResizerStyle,
} from "@/page/App/components/ActionEditor/style"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import {
  resCloseIconStyle,
  applyResContainerStyle,
  resHeaderStyle,
  resTitleStyle,
  resContentStyle,
  resStatusIconStyle,
  resSuccessStatusIconStyle,
} from "./style"
import { ActionResultProps } from "./interface"

export const ActionResult: FC<ActionResultProps> = (props) => {
  const { onClose, result } = props

  const layerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(182)
  const [title, setTitle] = useState("Ran successfully")
  const { editorHeight } = useContext(ActionEditorContext)
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
      <div
        ref={layerRef}
        css={css(
          applyResContainerStyle(editorHeight - 120),
          applyContainerHeight(containerHeight),
        )}
      >
        <div css={resHeaderStyle}>
          <RightIcon
            css={css(resStatusIconStyle, resSuccessStatusIconStyle)}
            size="10px"
          />
          <span css={resTitleStyle}>{title}</span>
          <CloseIcon css={resCloseIconStyle} onClick={onClose} />
        </div>

        <pre css={resContentStyle}>{result}</pre>
        {/* <EditorInput
            mode="application/json"
            lineNumbers={false}
            readOnly
            css={resContentStyle}
            /> */}
      </div>
    </div>
  )
}

ActionResult.displayName = "ActionResult"
