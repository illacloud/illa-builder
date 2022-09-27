import { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import {
  applyScaleContainerStyle,
  previewStyle,
  messageStyle,
  messageWrapper,
} from "./style"
import { CanvasPanelProps } from "./interface"
import { DotPanel } from "@/page/App/components/DotPanel"
import { useDispatch, useSelector } from "react-redux"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { FullScreenIcon, LockIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { getFreezyState, getIllaMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { FocusManager } from "@/utils/focusManager"

export const CanvasPanel: FC<CanvasPanelProps> = props => {
  const { ...otherProps } = props

  const { t } = useTranslation()
  const canvasTree = useSelector(getCanvas)
  const mode = useSelector(getIllaMode)
  const dispatch = useDispatch()
  const isFreezy = useSelector(getFreezyState)

  return (
    <div
      {...otherProps}
      css={applyScaleContainerStyle(100)}
      onClick={() => {
        FocusManager.switchFocus("canvas")
      }}
    >
      {applyCanvasTree(canvasTree)}
      {mode === "edit" && (
        <>
          <Button
            css={previewStyle}
            colorScheme="white"
            variant="fill"
            leftIcon={<FullScreenIcon />}
            onClick={() => {
              dispatch(configActions.updateIllaMode("preview"))
            }}
          >
            {t("preview")}
          </Button>
          {/*TODO: replace this to illa-design/Message,when Message is ok*/}
          {isFreezy ? (
            <div css={messageWrapper}>
              <span css={messageStyle}>
                <LockIcon />
                <span style={{ marginLeft: "8px" }}>
                  {t("freeze_messages")}
                </span>
              </span>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

// current root must be dot panel
function applyCanvasTree(
  componentNode: ComponentNode | null,
): ReactNode | null {
  if (componentNode == null) {
    return null
  }
  switch (componentNode.containerType) {
    case "EDITOR_DOT_PANEL":
      return (
        <DotPanel
          key={componentNode.displayName}
          componentNode={componentNode}
        />
      )
    default:
      return null
  }
}

CanvasPanel.displayName = "CanvasPanel"
