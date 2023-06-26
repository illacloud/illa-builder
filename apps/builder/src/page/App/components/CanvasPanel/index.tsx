import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { LockIcon } from "@illa-design/react"
import { DotPanel } from "@/page/App/components/DotPanel"
import {
  getFreezeState,
  getIsILLAEditMode,
} from "@/redux/config/configSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { CanvasPanelProps } from "./interface"
import {
  applyScaleContainerStyle,
  messageStyle,
  messageWrapperStyle,
} from "./style"

export const CanvasPanel = forwardRef<HTMLDivElement, CanvasPanelProps>(
  (props, ref) => {
    const { ...otherProps } = props

    const { t } = useTranslation()
    const isEditMode = useSelector(getIsILLAEditMode)
    const isFreeze = useSelector(getFreezeState)
    const executionResult = useSelector(getExecutionResult)

    if (!executionResult || !executionResult.root) {
      return null
    }

    return (
      <div {...otherProps} ref={ref} css={applyScaleContainerStyle(isEditMode)}>
        <DotPanel />
        {isEditMode && (
          <>
            {isFreeze ? (
              <div css={messageWrapperStyle}>
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
  },
)

CanvasPanel.displayName = "CanvasPanel"
