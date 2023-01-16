import {
  RefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import {
  CloseIcon,
  SuccessCircleIcon,
  WarningCircleIcon,
} from "@illa-design/react"
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

export const ActionResult = forwardRef<HTMLDivElement, ActionResultProps>(
  (props, ref) => {
    const { result, maxHeight, placeholderRef, onClose } = props
    const res = result?.result
    const panelRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const [dragMaxHeight, setDragMaxHeight] = useState<number>()

    useImperativeHandle(ref, () => panelRef.current as HTMLDivElement, [])

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
            <div
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
            >
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
