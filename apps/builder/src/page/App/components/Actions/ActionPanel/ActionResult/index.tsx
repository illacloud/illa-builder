import { RefObject, forwardRef, useImperativeHandle, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Alert, CloseIcon, SuccessCircleIcon } from "@illa-design/react"
import { ApiError } from "@/api/base"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ActionResultType } from "./interface"
import {
  applyMaxHeightStyle,
  codeStyle,
  customerCodeStyle,
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

export const ActionResult = forwardRef<HTMLDivElement, ActionResultProps>(
  (props, ref) => {
    const { result, maxHeight, placeholderRef, onClose } = props
    const res = result?.result
    const panelRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()

    useImperativeHandle(ref, () => panelRef.current as HTMLDivElement, [result])

    const getMaxHeight = () => {
      if (panelRef.current) {
        const children = panelRef.current.children
        return children[children.length - 1].scrollHeight + 40
      }
    }

    return res ? (
      <div
        css={[resultContainerStyle, applyMaxHeightStyle(maxHeight)]}
        ref={panelRef}
      >
        {result?.error ? (
          <Alert
            bdRadius="0"
            closable
            type={"warning"}
            title={(res as ApiError)?.errorMessage?.toString()}
          />
        ) : (
          <>
            <DragBar
              resizeRef={panelRef}
              placeholderRef={placeholderRef}
              minHeight={40}
              getMaxHeight={getMaxHeight}
            />
            <div css={successResultWrapperStyle}>
              <div css={resultSuccessLeftContainer}>
                <SuccessCircleIcon css={successIconStyle} fs="16px" />
                <span>{t("editor.action.result.title.success")}</span>
              </div>
              <CloseIcon css={resCloseIconStyle} onClick={onClose} />
            </div>
            <div css={codeStyle}>
              <CodeEditor
                lang={CODE_LANG.SQL}
                expectValueType={VALIDATION_TYPES.STRING}
                value={JSON.stringify(res, null, 2)}
                wrapperCss={customerCodeStyle}
                readOnly
                showLineNumbers
                editable={false}
              />
            </div>
          </>
        )}
      </div>
    ) : null
  },
)

ActionResult.displayName = "ActionResult"
