import { FC, useRef, useState, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { css } from "@emotion/react"
import { RightIcon, CloseIcon, WarningCircleIcon } from "@illa-design/icon"
import { useResize } from "@/utils/hooks/useResize"
import { AxiosResponse } from "axios"
import {
  actionEditorPanelLayoutWrapper,
  applyContainerHeight,
  applyResizerStyle,
} from "@/page/App/components/ActionEditor/style"
import { getSelectedAction } from "@/redux/currentApp/config/configSelector"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { ApiResult } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/ApiResult"
import { DatabaseResult } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/DatabaseResult"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"
import {
  resCloseIconStyle,
  applyResContainerStyle,
  resHeaderStyle,
  resTitleStyle,
  resContentStyle,
  resSuccessStatusIconStyle,
  resFailStatusIconStyle,
} from "./style"
import { ActionResultProps, ActionResultType } from "./interface"
import { TransformerResult } from "./TransformerResult"

const CONTAINER_DEFAULT_HEIGHT = 180

function renderStatusNode(error?: boolean) {
  if (error) {
    return <WarningCircleIcon css={resFailStatusIconStyle} size="10px" />
  }

  return <RightIcon css={resSuccessStatusIconStyle} size="10px" />
}

function renderResult(
  activeActionItem: ActionItem,
  result?: ActionResultType
) {
  const { actionType } = activeActionItem

  switch (actionType) {
    case ACTION_TYPE.REST_API:
      return <ApiResult result={result as AxiosResponse} />
    case ACTION_TYPE.MYSQL:
      return <DatabaseResult result={result as AxiosResponse} />
    case ACTION_TYPE.TRANSFORMER:
      return <TransformerResult result={result as string} />
  }
}

export const ActionResult: FC<ActionResultProps> = (props) => {
  const { onClose, result, error, className } = props
  const { t } = useTranslation()
  const activeActionItem = useSelector(getSelectedAction)
  const { editorHeight } = useContext(ActionEditorContext)
  const resultContainerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(
    CONTAINER_DEFAULT_HEIGHT,
  )

  const onHeightChange = (height: number) => {
    setContainerHeight(height)
  }

  const resizer = useResize("vertical", resultContainerRef, onHeightChange)

  const title = error
    ? t("editor.action.result.title.error")
    : t("editor.action.result.title.success")

  const resultNode = useMemo(
    () => renderResult(activeActionItem, result),
    [activeActionItem, result],
  )

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
          {renderStatusNode(error)}
          <span css={resTitleStyle}>{title}</span>
          <CloseIcon css={resCloseIconStyle} onClick={onClose} />
          p        </div>
        <div css={resContentStyle}>{resultNode}</div>
      </div>
    </motion.div>
  )
}

ActionResult.displayName = "ActionResult"
