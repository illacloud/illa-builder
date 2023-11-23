import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Space } from "@illa-design/react"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import PanelHeader from "@/page/App/components/Actions/ActionPanel/PanelHeader"
import { AIAgentResourceChoose } from "@/page/App/components/Actions/ActionPanel/PanelHeader/AIAgentResourceChoose"
import MockOperation from "@/page/App/components/Actions/ActionPanel/PanelHeader/MockOperation"
import TriggerModeChoose from "@/page/App/components/Actions/ActionPanel/PanelHeader/TriggerModeChoose"
import { NO_EVENT_HANDLER, NO_OPTIONS_HEADER } from "./constants"
import { GeneralPanelLayoutProps } from "./interface"
import {
  actionContainerStyle,
  headerOptionContainerStyle,
  headerOptionTitleStyle,
  spaceStyle,
} from "./style"

const MockPanelHeader: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <div css={headerOptionContainerStyle}>
        <span css={headerOptionTitleStyle}>
          {t("editor.action.panel.option.trigger.label")}
        </span>
        <TriggerModeChoose />
      </div>
      <Space w="100%" h="8px" css={spaceStyle} disp="block" />
    </>
  )
}

const DataPanelHeader: FC<Pick<GeneralPanelLayoutProps, "actionType">> = ({
  actionType,
}) => {
  const { t } = useTranslation()
  switch (actionType) {
    case "aiagent": {
      return <AIAgentResourceChoose />
    }
    case "illadrive": {
      return (
        <>
          <div css={headerOptionContainerStyle}>
            <span css={headerOptionTitleStyle}>
              {t("editor.action.panel.option.trigger.label")}
            </span>
            <TriggerModeChoose />
          </div>
          <Space w="100%" h="8px" css={spaceStyle} disp="block" />
        </>
      )
    }
    case "transformer":
    case "globalData":
      return null
    default: {
      return <PanelHeader />
    }
  }
}

const GeneralPanelLayout: FC<GeneralPanelLayoutProps> = ({
  actionType,
  mockEnabled,
  children,
}) => {
  if (!actionType) return null
  return (
    <>
      {!NO_OPTIONS_HEADER.includes(actionType) && (
        <MockOperation enableMock={!!mockEnabled} />
      )}
      <div css={actionContainerStyle}>
        {mockEnabled ? (
          <MockPanelHeader />
        ) : (
          <DataPanelHeader actionType={actionType} />
        )}
        {children}
        {!NO_EVENT_HANDLER.includes(actionType) && <ActionEventHandler />}
      </div>
    </>
  )
}

export default GeneralPanelLayout
