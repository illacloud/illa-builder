import { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { applyScaleContainerStyle, previewStyle } from "./style"
import { CanvasPanelProps } from "./interface"
import { DotPanel } from "@/page/App/components/DotPanel"
import { useDispatch, useSelector } from "react-redux"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { FullScreenIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { getIllaMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

export const CanvasPanel: FC<CanvasPanelProps> = (props) => {
  const { ...otherProps } = props

  const { t } = useTranslation()
  const canvasTree = useSelector(getCanvas)
  const mode = useSelector(getIllaMode)
  const dispatch = useDispatch()

  return (
    <div {...otherProps} css={applyScaleContainerStyle(100)}>
      {applyCanvasTree(canvasTree)}
      {mode === "edit" && (
        <Button
          css={previewStyle}
          colorScheme="grayBlue"
          variant="outline"
          leftIcon={<FullScreenIcon />}
          onClick={() => {
            dispatch(configActions.updateIllaMode("preview"))
          }}
        >
          {t("preview")}
        </Button>
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
