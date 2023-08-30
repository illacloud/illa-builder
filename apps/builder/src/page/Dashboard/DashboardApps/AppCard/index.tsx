import { Avatar } from "@illa-public/avatar"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, MouseEvent, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Space, Tag } from "@illa-design/react"
import {
  appNameStyle,
  cardStyle,
  descriptionStyle,
  editedStyle,
  editorAvatarStyle,
  editorContainerStyle,
  footerStyle,
  headerStyle,
  titleInfoStyle,
} from "@/page/Dashboard/DashboardApps/AppCard/style"
import { AppCardActionItem } from "@/page/Dashboard/DashboardApps/AppCardActionItem"
import AppConfigSelect from "@/page/Dashboard/DashboardApps/AppConfigSelect"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { fromNow } from "@/utils/dayjs"
import { track } from "@/utils/mixpanelHelper"
import { ActionButtonGroup } from "../ActionButtonGroup"

interface AppCardProps {
  appInfo: DashboardApp
}

export const AppCard: FC<AppCardProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo, ...rest } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const canEditApp = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const onClickCard = useCallback(() => {
    if (canEditApp) {
      navigate(`/${teamIdentifier}/app/${appInfo.appId}`)
    } else if (appInfo.mainlineVersion !== 0) {
      navigate(`/${teamIdentifier}/deploy/app/${appInfo.appId}`)
    }
  }, [
    appInfo.appId,
    appInfo.mainlineVersion,
    canEditApp,
    navigate,
    teamIdentifier,
  ])

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLDivElement).dataset?.element !== "listItem") return

      if (canEditApp) {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_edit", parameter5: appInfo.appId },
        )
      }

      if (appInfo.mainlineVersion !== 0) {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_launch", parameter5: appInfo.appId },
        )
      }
    },
    [canEditApp, appInfo.appId, appInfo.mainlineVersion],
  )

  const editors = useMemo(() => {
    return (
      <div css={editorContainerStyle}>
        {appInfo?.editedBy?.map((editor) =>
          editor ? (
            <Avatar
              key={editor.userID}
              css={editorAvatarStyle}
              avatarUrl={editor.avatar}
              name={editor.nickname}
              id={editor.userID}
            />
          ) : null,
        )}
      </div>
    )
  }, [appInfo?.editedBy])

  return (
    <div
      css={cardStyle}
      onClick={onClickCard}
      onMouseEnter={handleMouseEnter}
      {...rest}
    >
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <div css={appNameStyle}>{appInfo.appName}</div>
          <div css={editedStyle}>
            {t("dashboard.app.edited_time", {
              time: fromNow(appInfo.updatedAt),
              user: appInfo.appActivity.modifier,
            })}
          </div>
          <Space>
            {appInfo.deployed ? (
              <Tag colorScheme="green" size="small">
                {t("new_dashboard.status.deployed")}
              </Tag>
            ) : (
              <Tag colorScheme="grayBlue" size="small">
                {t("new_dashboard.status.undeploy")}
              </Tag>
            )}
            {appInfo.config.publishedToMarketplace && (
              <Tag size="small" colorScheme="techPurple">
                {t("dashboard.common.marketplace")}
              </Tag>
            )}
          </Space>
        </div>
        <AppCardActionItem
          isPublic={appInfo.config.public}
          isContributed={false}
          appId={appInfo.appId}
          canEditApp={canEditApp}
          isDeploy={appInfo.mainlineVersion !== 0}
          onClick={stopPropagation}
          appName={appInfo.appName}
        />
      </div>
      <div>
        <div css={descriptionStyle}>
          {appInfo.config.description || t("new_dashboard.desc.no_description")}
        </div>
      </div>
      {isCloudVersion ? (
        <>
          {editors}
          <div css={footerStyle}>
            <div className="public-info" onClick={stopPropagation}>
              <AppConfigSelect
                appId={appInfo.appId}
                isPublic={appInfo.config.public}
                isDeployed={appInfo.deployed}
                canEditApp={canEditApp}
              />
            </div>
            <ActionButtonGroup appInfo={appInfo} canEditApp={canEditApp} />
          </div>
        </>
      ) : (
        <div css={footerStyle}>
          {editors}
          <ActionButtonGroup appInfo={appInfo} canEditApp={canEditApp} />
        </div>
      )}
    </div>
  )
}

AppCard.displayName = "AppCard"
