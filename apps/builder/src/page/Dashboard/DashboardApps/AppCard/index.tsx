import { Avatar } from "@illa-public/avatar"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
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
import { AppCardProps } from "@/page/Dashboard/DashboardApps/AppCard/interface"
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
import { AppConfigSelect } from "@/page/Dashboard/DashboardApps/AppConfigSelect"
import { fromNow } from "@/utils/dayjs"
import { track } from "@/utils/mixpanelHelper"
import { ActionButtonGroup } from "../ActionButtonGroup"

export const AppCard: FC<AppCardProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const canEditApp = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.EDIT_APP,
  )

  const onClickCard = useCallback(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "card",
      parameter3: "team",
      parameter5: appInfo.appId,
    })
    if (canEditApp) {
      navigate(`/${teamIdentifier}/app/${appInfo.appId}`)
    } else if (appInfo.deployed) {
      navigate(`/${teamIdentifier}/deploy/app/${appInfo.appId}`)
    }
  }, [appInfo.appId, appInfo.deployed, canEditApp, navigate, teamIdentifier])

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

      if (appInfo.deployed) {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_launch", parameter5: appInfo.appId },
        )
      }
    },
    [canEditApp, appInfo.deployed, appInfo.appId],
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
    <div css={cardStyle} onClick={onClickCard} onMouseEnter={handleMouseEnter}>
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
        <AppCardActionItem appInfo={appInfo} />
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
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
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
