import { isBoolean } from "lodash"
import {
  FC,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Await,
  useBeforeUnload,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom"
import { Button, PlusIcon, useMessage } from "@illa-design/react"
import { BASIC_APP_CONFIG } from "@/config/newAppConfig"
import { Avatar } from "@/illa-public-component/Avatar"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import {
  canManage,
  canUseUpgradeFeature,
} from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { DashBoardInviteModal } from "@/page/Dashboard/DashboardApps/AppInviteModal"
import { openGuideModal } from "@/page/Template/gideModeModal"
import { getIsTutorialViewed } from "@/redux/currentUser/currentUserSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { fetchCreateApp } from "@/services/apps"
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
  teamAvatarStyle,
  teamInfoContainerStyle,
} from "./style"

export const DashboardApps: FC = () => {
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()
  const message = useMessage()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { appList } = useLoaderData() as { appList: DashboardApp[] }

  const teamInfo = useSelector(getCurrentTeamInfo)
  const isTutorialViewed = useSelector(getIsTutorialViewed)
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [loading, setLoading] = useState(false)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)

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

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
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

  const openInviteModal = useCallback(() => {
    if (isCloudVersion && !canUseBillingFeature) {
      handleUpgradeModalVisible(true, "upgrade")
      return
    }
    setInviteModalVisible(true)
  }, [canUseBillingFeature, handleUpgradeModalVisible])

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
    <div css={appsContainerStyle}>
      <div css={listTitleContainerStyle}>
        <div css={teamInfoContainerStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={teamInfo?.icon}
            name={teamInfo?.name}
            id={teamInfo?.id}
          />
          <span css={listTitleStyle}>{teamInfo?.name}</span>
        </div>
        {canCreateApp ? (
          <div>
            <Button w="200px" colorScheme="grayBlue" onClick={openInviteModal}>
              {t("user_management.page.invite")}
            </Button>
            <Button
              ml="4px"
              w="200px"
              colorScheme="techPurple"
              leftIcon={<PlusIcon />}
              loading={loading}
              onClick={handleCreateApp}
            >
              {t("create_new_app")}
            </Button>
          </div>
        ) : null}
      </div>
      <Suspense fallback={<DashBoardLoading />}>
        <Await resolve={appList} errorElement={<DashboardErrorElement />}>
          <AppsContentBody
            canEditApp={canEditApp}
            onCreatedApp={handleCreateApp}
            loading={loading}
          />
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

export default DashboardApps

DashboardApps.displayName = "DashboardApps"
