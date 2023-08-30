import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { FC, MouseEvent, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Space } from "@illa-design/react"
import { track } from "@/utils/mixpanelHelper"
import { ActionButtonGroupProps } from "./interface"
import { appActionButtonStyle } from "./style"

export const ActionButtonGroup: FC<ActionButtonGroupProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo, canEditApp } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()

  const toDeployedApp = useMemo(
    () => (e: MouseEvent) => {
      e.stopPropagation()
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        {
          element: "app_launch",
          parameter5: appInfo.appId,
        },
      )
      navigate(`/${teamIdentifier}/deploy/app/${appInfo.appId}`)
    },
    [navigate, teamIdentifier, appInfo.appId],
  )

  const toEditApp = useMemo(
    () => (e: MouseEvent) => {
      e.stopPropagation()
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        {
          element: "app_edit",
          parameter5: appInfo.appId,
        },
      )
      navigate(`/${teamIdentifier}/app/${appInfo.appId}`)
    },
    [navigate, teamIdentifier, appInfo.appId],
  )

  return (
    <Space
      direction="horizontal"
      w="100%"
      justifyContent="end"
      size="8px"
      alignItems="center"
    >
      {appInfo.deployed ? (
        <Button
          css={appActionButtonStyle}
          className="dashboardAppEditButton"
          variant="text"
          colorScheme="grayBlue"
          onClick={toDeployedApp}
        >
          {t("launch")}
        </Button>
      ) : null}
      {canEditApp ? (
        <Button
          css={appActionButtonStyle}
          className="dashboardAppLaunchButton"
          variant="text"
          colorScheme="grayBlue"
          onClick={toEditApp}
        >
          {t("edit")}
        </Button>
      ) : null}
    </Space>
  )
}
