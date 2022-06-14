import { FC, useRef, useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import { css } from "@emotion/react"
import { RightIcon, CloseIcon, WarningCircleIcon } from "@illa-design/icon"
import { useResize } from "@/utils/hooks/useResize"
import { motion } from "framer-motion"
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
  resFailStatusIconStyle,
} from "./style"
import { ActionResultProps, ActionRestultStatus } from "./interface"

const CONTAINER_DEFAULT_HEIGHT = 180

function renderStatusNode(status: ActionRestultStatus) {
  switch (status) {
    case "success": {
      return (
        <RightIcon
          css={css(resStatusIconStyle, resSuccessStatusIconStyle)}
          size="10px"
        />
      )
    }

    case "error": {
      return (
        <WarningCircleIcon
          css={css(resStatusIconStyle, resFailStatusIconStyle)}
          size="10px"
        />
      )
    }
  }
}

export const ActionResult: FC<ActionResultProps> = (props) => {
  const { onClose, result, status = "success", className } = props
  const { t } = useTranslation()
  const { editorHeight } = useContext(ActionEditorContext)
  const resultContainerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(
    CONTAINER_DEFAULT_HEIGHT,
  )

  const onHeightChange = (height: number) => {
    setContainerHeight(height)
  }

  const resizer = useResize("vertical", resultContainerRef, onHeightChange)
  const title =
    status === "success"
      ? t("editor.action.result.title.success")
      : t("editor.action.result.title.error")

  return (
    <motion.div
      css={actionEditorPanelLayoutWrapper}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        onMouseDown={resizer.onMouseDown}
        onTouchStart={resizer.onTouchStart}
        onTouchEnd={resizer.onMouseUp}
        css={applyResizerStyle(resizer.resizing, containerHeight)}
      />
      <div
        ref={resultContainerRef}
        css={css(
          applyResContainerStyle(editorHeight - 120),
          applyContainerHeight(containerHeight),
        )}
      >
        <div css={resHeaderStyle}>
          {renderStatusNode(status)}
          <span css={resTitleStyle}>{title}</span>
          <CloseIcon css={resCloseIconStyle} onClick={onClose} />
        </div>
        {/* TODO:@Spike use InputEditor to display result */}
        <pre css={resContentStyle}>{result}</pre>
      </div>
    </motion.div>
  )
}

ActionResult.displayName = "ActionResult"
