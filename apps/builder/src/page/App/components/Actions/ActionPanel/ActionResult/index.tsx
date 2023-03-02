import { forwardRef, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  CloseIcon,
  SuccessCircleIcon,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import {
  actionResultContainerStyle,
  alertBarStyle,
  alertTextStyle,
  applyActionContentContainerStyle,
  customerCodeStyle,
} from "@/page/App/components/Actions/ActionPanel/ActionResult/style"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { getSelectedAction } from "@/redux/config/configSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"

export const ActionResult = forwardRef<HTMLDivElement, ActionResultProps>(
  (props, ref) => {
    const { onClose, visible } = props

    const resizeRef = useRef<HTMLDivElement>(null)

    const alertRef = useRef<HTMLDivElement>(null)

    const executionResult = useSelector(getExecutionResult)

    const selectedAction = useSelector(getSelectedAction)!

    const { t } = useTranslation()

    const renderResult =
      (executionResult[selectedAction.displayName]?.data !== undefined ||
        executionResult[selectedAction.displayName]?.runResult !== undefined) &&
      visible

    const isError =
      executionResult[selectedAction.displayName]?.runResult?.error

    const [codeMirrorHeight, setCodeMirrorHeight] = useState(260)

    return (
      <div css={actionResultContainerStyle}>
        <div
          css={applyActionContentContainerStyle(renderResult)}
          ref={resizeRef}
        >
          <DragBar
            minHeight={300}
            resizeRef={resizeRef}
            onChange={() => {
              setCodeMirrorHeight(
                resizeRef.current!.offsetHeight -
                  alertRef.current!.offsetHeight,
              )
            }}
          />
          <div ref={alertRef} css={alertBarStyle}>
            {isError ? (
              <WarningCircleIcon c={getColor("red", "03")} />
            ) : (
              <SuccessCircleIcon c={getColor("green", "03")} />
            )}
            <span css={alertTextStyle}>
              {isError
                ? t("editor.action.panel.status.ran_failed")
                : t("editor.action.panel.status.ran_successfully")}
            </span>
            <CloseIcon
              cur="pointer"
              c={getColor("grayBlue", "05")}
              onClick={onClose}
            />
          </div>
          <CodeEditor
            height={codeMirrorHeight + "px"}
            wrapperCss={customerCodeStyle}
            showLineNumbers
            editable={false}
            value={
              isError
                ? executionResult[selectedAction.displayName]?.runResult
                    ?.message
                : JSON.stringify(
                    executionResult[selectedAction.displayName]?.data,
                    undefined,
                    2,
                  )
            }
            lang={CODE_LANG.JSON}
          />
        </div>
      </div>
    )
  },
)

ActionResult.displayName = "ActionResult"
