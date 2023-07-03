import { FC, HTMLAttributes } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { Button, PenIcon, Space, Tag } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import {
  appNameStyle,
  cardStyle,
  descriptionStyle,
  editedStyle,
  footerStyle,
  headerStyle,
  titleInfoStyle,
} from "@/page/Dashboard/DashboardApps/AppCard/style"
import { AppCardActionItem } from "@/page/Dashboard/DashboardApps/AppCardActionItem"
import AppConfigSelect from "@/page/Dashboard/DashboardApps/AppConfigSelect"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { fromNow } from "@/utils/dayjs"
import { track } from "@/utils/mixpanelHelper"

interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
  appInfo: DashboardApp
  canEditApp: boolean
}
export const AppCard: FC<AppCardProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo, canEditApp, ...rest } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()

  return (
    <div css={cardStyle} {...rest}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <div css={appNameStyle}>{appInfo.appName}</div>
          <div css={editedStyle}>
            {t("dashboard.app.edited_time", {
              time: fromNow(appInfo.updatedAt),
              user: appInfo.appActivity.modifier,
            })}
          </div>
          <div className="deployed">
            {appInfo.deployed ? (
              <Tag colorScheme="green" size="small">
                Deployed
              </Tag>
            ) : (
              <Tag colorScheme="grayBlue" size="small">
                Undeploy
              </Tag>
            )}
          </div>
        </div>
        <AppCardActionItem
          appId={appInfo.appId}
          canEditApp={canEditApp}
          isDeploy={appInfo.mainlineVersion !== 0}
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </div>
      <div css={descriptionStyle}>
        {appInfo.config.description || "No description"}
      </div>
      <div className="images">
        {appInfo?.editedBy?.map((editor, index) => (
          <img key={index} className="avatar" src={editor.avatar} alt="" />
        ))}
      </div>
      <div css={footerStyle}>
        <div
          className="public-info"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <AppConfigSelect
            appId={appInfo.appId}
            isPublic={appInfo.config.public}
            canEditApp={canEditApp}
          />
        </div>
        <Space
          direction="horizontal"
          w="100%"
          justifyContent="end"
          size="8px"
          alignItems="center"
        >
          {appInfo.deployed ? (
            <Button
              size="small"
              colorScheme="white"
              onClick={(e) => {
                e.stopPropagation()
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                  { element: "app_launch", parameter5: appInfo.appId },
                )
                navigate(`/${teamIdentifier}/deploy/app/${appInfo.appId}`)
              }}
            >
              {t("launch")}
            </Button>
          ) : null}
          {canEditApp ? (
            <Button
              size="small"
              colorScheme="grayBlue"
              leftIcon={<PenIcon />}
              onClick={() => {
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                  { element: "app_edit", parameter5: appInfo.appId },
                )
                navigate(`/${teamIdentifier}/app/${appInfo.appId}`)
              }}
            >
              {t("edit")}
            </Button>
          ) : null}
        </Space>
      </div>
    </div>
  )
}

AppCard.displayName = "AppCard"
