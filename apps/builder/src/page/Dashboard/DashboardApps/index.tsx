import copy from "copy-to-clipboard"
import { isBoolean } from "lodash"
import { FC, Suspense, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Await,
  useBeforeUnload,
  useLoaderData,
  useParams,
} from "react-router-dom"
import { Button, Divider, useMessage } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { CreateNewModal } from "@/page/Dashboard/components/CreateNewModal"
import { openGuideModal } from "@/page/Template/gideModeModal"
import { getIsTutorialViewed } from "@/redux/currentUser/currentUserSelector"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"
import { isCloudVersion } from "@/utils/typeHelper"
import { DashboardErrorElement } from "../components/ErrorElement"
import { DashBoardLoading } from "../components/Loading"
import { AppsContentBody } from "./contentBody"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "./style"

export const DashboardApps: FC = () => {
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()
  const message = useMessage()
  const { appList } = useLoaderData() as { appList: DashboardApp[] }

  const teamInfo = useSelector(getCurrentTeamInfo)
  const isTutorialViewed = useSelector(getIsTutorialViewed)

  const [createNewModalVisible, setCreateNewModalVisible] = useState(false)

  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

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

  if (
    isBoolean(isTutorialViewed) &&
    !isTutorialViewed &&
    teamIdentifier &&
    canEditApp
  ) {
    openGuideModal(teamIdentifier)
  }

  useEffect(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.VISIT, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP)
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP)
  })

  useEffect(() => {
    canCreateApp &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "create_new_app" },
      )
  }, [canCreateApp])

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
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                  { element: "create_new_app" },
                )
              }}
            >
              {t("create_new_app")}
            </Button>
          ) : null}
        </div>
        <Divider direction="horizontal" />
        <Suspense fallback={<DashBoardLoading />}>
          <Await resolve={appList} errorElement={<DashboardErrorElement />}>
            <AppsContentBody canEditApp={canEditApp} />
          </Await>
        </Suspense>
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
