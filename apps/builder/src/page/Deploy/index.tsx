import {
  FC,
  MouseEvent,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Await, useLoaderData, useParams } from "react-router-dom"
import { Button, DownIcon, Switch, Trigger } from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { FullPageLoading } from "@/components/FullPageLoading"
import { UpgradeIcon } from "@/illa-public-component/Icon/upgrade"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import {
  canManage,
  isSubscribeLicense,
} from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import {
  applyPopupStateStyle,
  deployContainerStyle,
  deployLogoStyle,
  logoStyle,
  upgradeConfigStyle,
  upgradePopContainerStyle,
  upgradeTitleStyle,
} from "@/page/Deploy/style"
import {
  getAppInfo,
  getCurrentAppWaterMarkConfig,
} from "@/redux/currentApp/appInfo/appInfoSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { updateWaterMarkConfig } from "@/services/apps"
import { isCloudVersion } from "@/utils/typeHelper"
import Page404 from "../status/404"
import { DeployContent } from "./content"

export const Deploy: FC = () => {
  const dispatch = useDispatch()
  const currentApp = useSelector(getAppInfo)
  const waterMark = useSelector(getCurrentAppWaterMarkConfig)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const data = useLoaderData()
  const { appId } = useParams()
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const paymentStatus =
    isCloudVersion && isSubscribeLicense(teamInfo?.currentTeamLicense?.plan)
  const [popupVisible, setPopupVisible] = useState<boolean>()

  const canUpdateAppWaterMark = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.APP_WATER_MARK_CONFIG,
  )

  const updateWaterMarkConfigVisible = useCallback(
    (visible: boolean) => {
      if (canUpdateAppWaterMark) {
        setPopupVisible(visible)
      }
    },
    [canUpdateAppWaterMark],
  )

  const handleWaterMarkChange = useCallback(
    async (value: boolean, event: MouseEvent) => {
      if (appId) {
        event.stopPropagation()
        await updateWaterMarkConfig(value, appId)
        dispatch(
          dashboardAppActions.modifyConfigDashboardAppReducer({
            appId,
            config: { waterMark: value },
          }),
        )
      }
    },
    [appId, dispatch],
  )

  const handleUpgradeModal = useCallback(() => {
    if (!paymentStatus) {
      handleUpgradeModalVisible(true, "upgrade")
    }
  }, [paymentStatus, handleUpgradeModalVisible])

  useEffect(() => {
    document.title = currentApp.appName
  }, [currentApp.appName])

  return (
    <div css={deployContainerStyle}>
      <Suspense fallback={<FullPageLoading />}>
        <Await resolve={data} errorElement={<Page404 />}>
          <DeployContent />
        </Await>
      </Suspense>
      {isCloudVersion && !waterMark ? null : (
        <Trigger
          trigger="click"
          colorScheme="white"
          position="top-end"
          mb={"12px"}
          popupVisible={popupVisible}
          onVisibleChange={updateWaterMarkConfigVisible}
          content={
            paymentStatus ? (
              <div css={upgradeConfigStyle}>
                Remove watermark
                <Switch checked={waterMark} onChange={handleWaterMarkChange} />
              </div>
            ) : (
              <div css={upgradePopContainerStyle}>
                <div css={upgradeTitleStyle}>Upgrade to Plus</div>
                <div>Remove watermark</div>
                <Button
                  mt="8px"
                  colorScheme="techPurple"
                  onClick={handleUpgradeModal}
                >
                  <UpgradeIcon /> Upgrade
                </Button>
              </div>
            )
          }
        >
          <div
            css={deployLogoStyle}
            onClick={() => {
              !canUpdateAppWaterMark &&
                window.open("https://illacloud.com", "_blank")
            }}
          >
            <span>Powered by</span>
            <Logo css={logoStyle} />
            {canUpdateAppWaterMark ? (
              <DownIcon ml="8px" css={applyPopupStateStyle(popupVisible)} />
            ) : null}
          </div>
        </Trigger>
      )}
    </div>
  )
}

export default Deploy

Deploy.displayName = "Deploy"
