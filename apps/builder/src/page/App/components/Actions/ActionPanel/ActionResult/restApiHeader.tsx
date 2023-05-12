import { MouseEventHandler, forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, getColor } from "@illa-design/react"
import i18n from "@/i18n/config"
import {
  alertInfoContainerStyle,
  alertInfoStyle,
  alertTabsContainerStyle,
  alertTabsItemStyle,
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

const RestApiResultTabs = [
  {
    title: i18n.t("editor.action.panel.result.restapi.response"),
    name: RESULT_SHOW_TYPE.RESPONSE,
  },
  {
    title: i18n.t("editor.action.panel.result.restapi.rawdata"),
    name: RESULT_SHOW_TYPE.RAW_DATA,
  },
  {
    title: i18n.t("editor.action.panel.result.restapi.headers"),
    name: RESULT_SHOW_TYPE.HEADERS,
  },
]

interface AdvancedApiHeaderProps {
  showType: RESULT_SHOW_TYPE
  handleResultTabsClick: (
    activeType: RESULT_SHOW_TYPE,
  ) => MouseEventHandler<HTMLDivElement>
  statusCode?: number
  statusText?: string
  runningTimes: number
  onClose: MouseEventHandler<SVGElement>
}

export const AdvancedAPIHeader = forwardRef<
  HTMLDivElement,
  AdvancedApiHeaderProps
>((props, ref) => {
  const { handleResultTabsClick, showType, statusCode, runningTimes, onClose } =
    props

  const { t } = useTranslation()
  return (
    <div ref={ref} css={restApiAlertBarStyle}>
      <div css={alertTabsContainerStyle}>
        {RestApiResultTabs.map((info) => (
          <div
            key={info.name}
            css={[alertTabsItemStyle, getActiveStyle(showType === info.name)]}
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
        <CloseIcon
          cur="pointer"
          c={getColor("grayBlue", "05")}
          onClick={onClose}
        />
      </div>
    </div>
  )
})

AdvancedAPIHeader.displayName = "RestAPIHeader"
