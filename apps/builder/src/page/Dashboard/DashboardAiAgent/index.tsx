import { FC, Suspense, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Button, PlusIcon, useMessage } from "@illa-design/react"
import { BASIC_APP_CONFIG } from "@/config/newAppConfig"
import { Avatar } from "@/illa-public-component/Avatar"
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
import { AgentContentBody } from "@/page/Dashboard/DashboardAiAgent/contentBody"
import {
  containerStyle,
  listTitleContainerStyle,
  teamAvatarStyle,
  teamInfoContainerStyle,
  teamNameStyle,
} from "@/page/Dashboard/DashboardAiAgent/style"
import { DashBoardInviteModal } from "@/page/Dashboard/DashboardApps/AppInviteModal"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { fetchCreateApp } from "@/services/apps"
import { track } from "@/utils/mixpanelHelper"
import { DashboardErrorElement } from "../components/ErrorElement"
import { DashBoardLoading } from "../components/Loading"

const DashboardAiAgent: FC = () => {
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()
  const message = useMessage()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { appList } = useLoaderData() as { appList: DashboardApp[] }

  const teamInfo = useSelector(getCurrentTeamInfo)

  const [loading, setLoading] = useState(false)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)

  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const canEditApp = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

  const handleCreateApp = useCallback(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "create_new_app",
    })
    if (loading) return
    setLoading(true)
    fetchCreateApp({
      appName: "Untitled app",
      initScheme: BASIC_APP_CONFIG,
    })
      .then(
        (response) => {
          dispatch(
            dashboardAppActions.addDashboardAppReducer({
              app: response.data,
            }),
          )
          navigate(`/${teamIdentifier}/app/${response.data.appId}`)
        },
        () => {
          message.error({ content: t("create_fail") })
        },
      )
      .finally(() => {
        setLoading(false)
      })
  }, [loading, teamIdentifier, dispatch, navigate, message, t])

  const closeInviteModal = () => {
    setInviteModalVisible(false)
  }

  // const openInviteModal = useCallback(() => {
  //   if (isCloudVersion && !canUseBillingFeature) {
  //     handleUpgradeModalVisible(true, "upgrade")
  //     return
  //   }
  //   setInviteModalVisible(true)
  // }, [canUseBillingFeature, handleUpgradeModalVisible])

  return (
    <div css={containerStyle}>
      <div css={listTitleContainerStyle}>
        <div css={teamInfoContainerStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={teamInfo?.icon}
            name={teamInfo?.name}
            id={teamInfo?.id}
          />
          <span css={teamNameStyle}>{teamInfo?.name}</span>
        </div>
        {canEditApp ? (
          <Button
            w="320px"
            size="large"
            colorScheme="blackAlpha"
            leftIcon={<PlusIcon size="10px" />}
            loading={loading}
            onClick={handleCreateApp}
          >
            {t("Create an Agent")}
          </Button>
        ) : null}
      </div>
      <Suspense fallback={<DashBoardLoading />}>
        <Await resolve={appList} errorElement={<DashboardErrorElement />}>
          <AgentContentBody canEdit={canEditApp} />
        </Await>
      </Suspense>
      <DashBoardInviteModal
        hasApp={false}
        visible={inviteModalVisible}
        handleCloseModal={closeInviteModal}
      />
    </div>
  )
}

export default DashboardAiAgent

DashboardAiAgent.displayName = "DashboardAiAgent"
