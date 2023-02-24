import { RefObject, forwardRef, useImperativeHandle, useRef } from "react"
import { useTranslation } from "react-i18next"
import useMeasure from "react-use-measure"
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
  panelRef?: RefObject<HTMLDivElement>
  onClose: () => void
}

export const ActionResult = forwardRef<HTMLDivElement, ActionResultProps>(
  (props, ref) => {
    const {
      result,
      maxHeight,
      placeholderRef,
      onClose,
      panelRef: wrapperPanelRef,
    } = props
    const res = result?.result
    const panelRef = useRef<HTMLDivElement | null>(null)
    const { t } = useTranslation()
    const [containerRef, panelContainerBounds] = useMeasure()

    useImperativeHandle(ref, () => panelRef.current as HTMLDivElement, [result])

    const getMaxHeight = () => {
      if (wrapperPanelRef?.current) {
        return wrapperPanelRef.current.clientHeight - 120
      }
    }

    return res ? (
      <div
        css={[resultContainerStyle, applyMaxHeightStyle(maxHeight)]}
        ref={(el) => {
          containerRef(el)
          panelRef.current = el
        }}
      >
        {result?.error ? (
          <Alert
            bdRadius="0"
            closable
            type={"warning"}
            title={(res as ApiError)?.errorMessage?.toString()}
            onClose={onClose}
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
                lang={CODE_LANG.JSON}
                expectValueType={VALIDATION_TYPES.STRING}
                value={JSON.stringify(res, null, 2)}
                wrapperCss={customerCodeStyle}
                readOnly
                showLineNumbers
                editable={false}
                height={`${
                  panelContainerBounds.height - 40 < 180
                    ? 180
                    : panelContainerBounds.height - 40
                }px`}
              />
            </div>
          </>
        )}
      </div>
    ) : null
  },
)

ActionResult.displayName = "ActionResult"
