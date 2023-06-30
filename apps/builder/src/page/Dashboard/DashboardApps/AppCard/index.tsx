import { FC, HTMLAttributes } from "react"
import { useTranslation } from "react-i18next"
import { Button, Tag } from "@illa-design/react"
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
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { fromNow } from "@/utils/dayjs"

interface AppCardProps extends HTMLAttributes<HTMLDivElement> {
  appInfo: DashboardApp
  canEditApp: boolean
}
export const AppCard: FC<AppCardProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo, canEditApp, ...rest } = props

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
        <div className="public-info">
          <div className="public-text">
            {appInfo.config.public ? "Public" : "Private"}
          </div>
        </div>
        <div className="actions">
          <Button size="small">ddd</Button>
        </div>
      </div>
    </div>
  )
}

AppCard.displayName = "AppCard"
