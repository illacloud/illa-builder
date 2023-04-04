import {
  MouseEvent,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
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
import i18n from "@/i18n/config"
import { ActionResultProps } from "@/page/App/components/Actions/ActionPanel/ActionResult/interface"
import {
  actionResultContainerStyle,
  alertBarStyle,
  alertInfoContainerStyle,
  alertInfoStyle,
  alertTabsContainerStyle,
  alertTabsItemStyle,
  alertTextStyle,
  applyActionContentContainerStyle,
  customerCodeStyle,
  getActiveStyle,
  restApiAlertBarStyle,
  statusStyle,
  tabsContentStyle,
  timestampStyle,
} from "@/page/App/components/Actions/ActionPanel/ActionResult/style"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { getSelectedAction } from "@/redux/config/configSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"

type ResultShowType = "response" | "headers"

const RestApiResultTabs = [
  {
    title: i18n.t("editor.action.panel.result.restapi.response"),
    name: "response",
  },
  {
    title: i18n.t("editor.action.panel.result.restapi.headers"),
    name: "headers",
  },
]

export const ActionResult = forwardRef<HTMLDivElement, ActionResultProps>(
  (props, ref) => {
    const { onClose, visible, results } = props

    const resizeRef = useRef<HTMLDivElement>(null)

    const alertRef = useRef<HTMLDivElement>(null)

    const [showType, setShowType] = useState<ResultShowType>("response")

    const executionResult = useSelector(getExecutionResult)

    const selectedAction = useSelector(getSelectedAction)!

    const { t } = useTranslation()

    const renderResult =
      (executionResult[selectedAction.displayName]?.data !== undefined ||
        executionResult[selectedAction.displayName]?.runResult !== undefined) &&
      visible

    const isError =
      executionResult[selectedAction.displayName]?.runResult?.error
    const isRestApi = selectedAction.actionType === "restapi"
    const isActionRunSuccess = results?.extraData?.status === 200
    const isRestApiSuccess = isRestApi && isActionRunSuccess
    const runningTimes =
      (executionResult[selectedAction.displayName]?.endTime ?? 0) -
      (executionResult[selectedAction.displayName]?.startTime ?? 0)

    const [codeMirrorHeight, setCodeMirrorHeight] = useState(260)

    const handleResultTabsClick = (e: MouseEvent<HTMLDivElement>) => {
      setShowType(e.currentTarget.dataset.key as ResultShowType)
    }

    const ActionResultPanel = useMemo(() => {
      return (
        <div ref={alertRef} css={restApiAlertBarStyle}>
          <div css={alertTabsContainerStyle}>
            {RestApiResultTabs.map((info) => (
              <div
                key={info.name}
                css={[
                  alertTabsItemStyle,
                  getActiveStyle(showType === (info.name as ResultShowType)),
                ]}
                data-key={info.name}
                onClick={handleResultTabsClick}
              >
                <div css={tabsContentStyle}>{info.title}</div>
              </div>
            ))}
          </div>
          <div css={alertInfoContainerStyle}>
            <div css={alertInfoStyle}>
              {t("editor.action.panel.result.restapi.status")}
              <span css={statusStyle}>{results?.extraData?.status}</span>
            </div>
            <div css={alertInfoStyle}>
              Times
              <span css={timestampStyle}>{`${runningTimes}ms`}</span>
            </div>
            <CloseIcon
              cur="pointer"
              c={getColor("grayBlue", "05")}
              onClick={onClose}
            />
          </div>
        </div>
      )
    }, [t, results?.extraData?.status, runningTimes, onClose, showType])

    const getDisplayData = useCallback(
      (result: any) => {
        if (!isRestApi) {
          return result
        }
        return showType === "response"
          ? result?.result
          : result?.extraData?.headers
      },
      [isRestApi, showType],
    )

    const displayData = getDisplayData(results)

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

          {isRestApiSuccess ? (
            <>{ActionResultPanel}</>
          ) : (
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
          )}

          <CodeEditor
            height={codeMirrorHeight + "px"}
            wrapperCss={customerCodeStyle}
            showLineNumbers
            editable={false}
            value={
              isError
                ? executionResult[selectedAction.displayName]?.runResult
                    ?.message
                : JSON.stringify(displayData, undefined, 2)
            }
            lang={CODE_LANG.JSON}
          />
        </div>
      </div>
    )
  },
)

ActionResult.displayName = "ActionResult"
