import { FC, RefObject, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  CloseIcon,
  SuccessCircleIcon,
  WarningCircleIcon,
} from "@illa-design/react"
import { ApiError } from "@/api/base"
import { CodeEditor } from "@/components/CodeEditor"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ActionResultType } from "./interface"
import {
  applyMaxHeightStyle,
  codeStyle,
  errorIconStyle,
  errorResultWrapperStyle,
  resCloseIconStyle,
  resultContainerStyle,
  resultSuccessLeftContainer,
  successIconStyle,
  successResultWrapperStyle,
} from "./style"

interface ActionResultProps {
  result?: ActionResultType
  maxHeight?: number
  placeholderRef?: RefObject<HTMLDivElement>
  onClose: () => void
}

export const ActionResult: FC<ActionResultProps> = (props) => {
  const { result, maxHeight, placeholderRef, onClose } = props
  const res = result?.result
  const panelRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const [dragMaxHeight, setDragMaxHeight] = useState<number>()

  return res ? (
    <div
      css={[resultContainerStyle, applyMaxHeightStyle(maxHeight)]}
      ref={panelRef}
    >
      {result?.error ? (
        <div css={errorResultWrapperStyle}>
          <WarningCircleIcon css={errorIconStyle} fs="16px" />
          <span>{(res as ApiError)?.errorMessage?.toString()}</span>
        </div>
      ) : (
        <>
          <DragBar
            resizeRef={panelRef}
            placeholderRef={placeholderRef}
            minHeight={40}
            maxHeight={dragMaxHeight}
          />
          <div css={successResultWrapperStyle}>
            <div css={resultSuccessLeftContainer}>
              <SuccessCircleIcon css={successIconStyle} fs="16px" />
              <span>{t("editor.action.result.title.success")}</span>
            </div>
            <CloseIcon css={resCloseIconStyle} onClick={onClose} />
          </div>
          <CodeEditor
            css={codeStyle}
            ref={(ele) => {
              if (ele?.scrollHeight) {
                setDragMaxHeight(ele?.scrollHeight + 40)
              }
              if (placeholderRef?.current && ele?.clientHeight) {
                placeholderRef.current.style.paddingBottom = `${
                  ele?.clientHeight + 48
                }px`
              }
            }}
            mode={"JSON"}
            expectedType={VALIDATION_TYPES.STRING}
            value={JSON.stringify(res, null, 2)}
            border={"unset"}
            borderRadius={"0"}
            readOnly
            lineNumbers
          />
        </>
      )}
    </div>
  ) : null
}

ActionResult.displayName = "ActionResult"
