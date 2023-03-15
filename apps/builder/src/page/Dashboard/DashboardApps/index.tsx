import copy from "copy-to-clipboard"
import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Divider,
  Empty,
  List,
  ListItem,
  ListItemMeta,
  useMessage,
} from "@illa-design/react"
import {
  canManage,
  canManageApp,
  isBiggerThanTargetRole,
} from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { CreateNewModal } from "@/page/Dashboard/components/CreateNewModal"
import { DashboardItemMenu } from "@/page/Dashboard/components/DashboardItemMenu"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { TeamInfo } from "@/redux/team/teamState"
import { fromNow } from "@/utils/dayjs"
import { isCloudVersion } from "@/utils/typeHelper"
import {
  appsContainerStyle,
  hoverStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "./style"

export const DashboardApps: FC = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const message = useMessage()

  const appsList: DashboardApp[] = useSelector(getDashboardApps)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const [createNewModalVisible, setCreateNewModalVisible] = useState(false)

  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const canSetPublic = canManageApp(
    currentUserRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const canEditApp = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

  const canCreateApp = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.CREATE_APP,
  )

  const finalAppsList = useMemo(() => {
    if (canEditApp) return appsList
    return appsList.filter((item) => {
      return item.mainlineVersion !== 0
    })
  }, [canEditApp, appsList])

  return (
    <>
      <div css={appsContainerStyle}>
        <div css={listTitleContainerStyle}>
          <span css={listTitleStyle}>{t("dashboard.app.all_apps")}</span>
          {isCloudVersion ? null : (
            <Button
              colorScheme="gray"
              onClick={() => {
                copy(window.location.href)
                message.success({ content: t("link_copied") })
              }}
            >
              {t("share")}
            </Button>
          )}
          {canCreateApp ? (
            <Button
              ml="4px"
              colorScheme="techPurple"
              onClick={() => {
                setCreateNewModalVisible(true)
              }}
            >
              {t("create_new_app")}
            </Button>
          ) : null}
        </div>
        <Divider direction="horizontal" />
        {finalAppsList.length !== 0 && (
          <List
            h={"100%"}
            ov={"auto"}
            data={finalAppsList}
            bordered={false}
            hoverable={true}
            render={(item) => {
              return (
                <ListItem
                  css={hoverStyle}
                  extra={
                    <DashboardItemMenu
                      appId={item.appId}
                      canEditApp={canEditApp}
                      canManageApp={canSetPublic}
                      isDeploy={item.mainlineVersion !== 0}
                    />
                  }
                >
                  <ListItemMeta
                    onClick={() => {
                      if (canEditApp) {
                        navigate(`/${teamIdentifier}/app/${item.appId}`)
                      } else if (item.mainlineVersion !== 0) {
                        navigate(`/${teamIdentifier}/deploy/app/${item.appId}`)
                      }
                    }}
                    title={item.appName}
                    description={t("dashboard.app.edited_time", {
                      time: fromNow(item.updatedAt),
                      user: item.appActivity.modifier,
                    })}
                  />
                </ListItem>
              )
            }}
            renderKey={(item) => {
              return item.appId
            }}
          />
        )}
        {finalAppsList.length == 0 && <Empty paddingVertical="120px" />}
      </div>
      <CreateNewModal
        onCreateSuccess={() => {
          setCreateNewModalVisible(false)
        }}
        visible={createNewModalVisible}
        onVisibleChange={(visible) => {
          setCreateNewModalVisible(visible)
        }}
      />
    </>
  )
}

export default DashboardApps

DashboardApps.displayName = "DashboardApps"
