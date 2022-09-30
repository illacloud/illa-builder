import { FC, ReactNode, useRef } from "react"
import { CloseIcon, RightIcon, WarningCircleIcon } from "@illa-design/icon"
import { ActionResultType } from "./interface"
import {
  errorIconStyle,
  errorResultWrapperStyle,
  resCloseIconStyle,
  resultContainerStyle,
  successIconStyle,
  successResultWrapperStyle,
} from "./style"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ApiError } from "@/api/base"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { useTranslation } from "react-i18next"

interface ActionResultProps {
  result?: ActionResultType
  maxHeight?: number
  onClose: () => void
}

export const ActionResult: FC<ActionResultProps> = props => {
  const { result, maxHeight, onClose } = props
  const res = result?.result
  const panelRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  return res ? (
    <div css={resultContainerStyle} ref={panelRef}>
      {result?.error ? (
        <div css={errorResultWrapperStyle}>
          <WarningCircleIcon css={errorIconStyle} size="16px" />
          <span>{(res as ApiError)?.errorMessage?.toString()}</span>
        </div>
      ) : (
        <>
          <DragBar resizeRef={panelRef} minHeight={40} maxHeight={maxHeight} />
          <div css={successResultWrapperStyle}>
            <div>
              <RightIcon css={successIconStyle} size="16px" />
              <span>{t("editor.action.result.title.success")}</span>
            </div>
            <CloseIcon css={resCloseIconStyle} onClick={onClose} />
          </div>
          <CodeEditor
            mode={"JSON"}
            expectedType={VALIDATION_TYPES.STRING}
            value={JSON.stringify(res, null, 2)}
            border={"unset"}
            borderRadius={"0"}
            maxHeight={
              panelRef.current ? `${panelRef.current?.clientHeight - 40}px` : ""
            }
            readOnly
            lineNumbers
          />
        </>
      )}
    </div>
  ) : (
    <div></div>
  )
}

ActionResult.displayName = "ActionResult"
