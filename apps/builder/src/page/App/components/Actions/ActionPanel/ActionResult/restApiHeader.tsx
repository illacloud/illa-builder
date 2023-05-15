import { MouseEventHandler, forwardRef } from "react"
import { useTranslation } from "react-i18next"
import {
  CloseIcon,
  SuccessCircleIcon,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import {
  alertInfoContainerStyle,
  alertInfoStyle,
  alertTabsContainerStyle,
  alertTabsItemStyle,
  alertTextStyle,
  applyStatusCodeStyle,
  getActiveStyle,
  restApiAlertBarStyle,
  tabsContentStyle,
  timestampStyle,
} from "@/page/App/components/Actions/ActionPanel/ActionResult/style"

export enum RESULT_SHOW_TYPE {
  "RESPONSE" = "response",
  "HEADERS" = "headers",
  "RAW_DATA" = "rawData",
}

interface TabsConfig {
  title: string
  name: RESULT_SHOW_TYPE
  shown: boolean
}

interface AdvancedResultHeaderProps {
  showType: RESULT_SHOW_TYPE
  handleResultTabsClick: (
    activeType: RESULT_SHOW_TYPE,
  ) => MouseEventHandler<HTMLDivElement>
  statusCode?: number
  statusText?: string
  runningTimes: number
  onClose: MouseEventHandler<SVGElement>
  tabsConfig: TabsConfig[]
  isError: boolean
}

export const AdvancedResultHeader = forwardRef<
  HTMLDivElement,
  AdvancedResultHeaderProps
>((props, ref) => {
  const {
    handleResultTabsClick,
    showType,
    statusCode,
    runningTimes,
    tabsConfig,
    onClose,
    isError,
  } = props

  const canShownTabs = tabsConfig.filter((info) => info.shown)

  const { t } = useTranslation()
  return (
    <div ref={ref} css={restApiAlertBarStyle}>
      {canShownTabs.length > 1 ? (
        <>
          <div css={alertTabsContainerStyle}>
            {canShownTabs.map((info) => (
              <div
                key={info.name}
                css={[
                  alertTabsItemStyle,
                  getActiveStyle(showType === info.name),
                ]}
                data-key={info.name}
                onClick={handleResultTabsClick(info.name)}
              >
                <div css={tabsContentStyle}>{info.title}</div>
              </div>
            ))}
          </div>
          <div css={alertInfoContainerStyle}>
            {statusCode && (
              <div css={alertInfoStyle}>
                {t("editor.action.panel.result.restapi.status")}
                <span css={applyStatusCodeStyle(statusCode)}>{statusCode}</span>
              </div>
            )}
            <div css={alertInfoStyle}>
              Times
              <span css={timestampStyle}>{`${runningTimes}ms`}</span>
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
      <CloseIcon
        cur="pointer"
        c={getColor("grayBlue", "05")}
        onClick={onClose}
      />
    </div>
  )
})

AdvancedResultHeader.displayName = "RestAPIHeader"
