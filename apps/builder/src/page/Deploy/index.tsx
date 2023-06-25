import {
  FC,
  MouseEvent,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Await, useLoaderData, useParams } from "react-router-dom"
import { Button, DownIcon, Switch, Trigger } from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { FullPageLoading } from "@/components/FullPageLoading"
import { UpgradeIcon } from "@/illa-public-component/Icon/upgrade"
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
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { updateWaterMarkConfig } from "@/services/apps"
import { isCloudVersion } from "@/utils/typeHelper"
import Page404 from "../status/404"
import { DeployContent } from "./content"

const WaterMark: FC = () => {
  return (
    <div
      css={deployLogoStyle}
      onClick={() => {
        window.open("https://illacloud.com", "_blank")
      }}
    >
      <span>Powered by</span>
      <Logo css={logoStyle} />
    </div>
  )
}

export const Deploy: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentApp = useSelector(getAppInfo)
  const waterMark = useSelector(getCurrentAppWaterMarkConfig)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const data = useLoaderData()
  const { appId } = useParams()
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [popupVisible, setPopupVisible] = useState<boolean>()

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

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
        const res = await updateWaterMarkConfig(value, appId)
        dispatch(appInfoActions.updateAppInfoReducer(res))
      }
    },
    [appId, dispatch],
  )

  const handleUpgradeModal = useCallback(() => {
    if (!canUseBillingFeature) {
      handleUpgradeModalVisible(true, "upgrade")
    }
  }, [canUseBillingFeature, handleUpgradeModalVisible])

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
      {isCloudVersion ? (
        canUpdateAppWaterMark && !waterMark ? (
          <Trigger
            trigger="click"
            colorScheme="white"
            position="top-end"
            mb={"12px"}
            popupVisible={popupVisible}
            onVisibleChange={updateWaterMarkConfigVisible}
            content={
              canUseBillingFeature ? (
                <div css={upgradeConfigStyle}>
                  Remove watermark
                  <Switch
                    checked={waterMark}
                    onChange={handleWaterMarkChange}
                  />
                </div>
              ) : (
                <div css={upgradePopContainerStyle}>
                  <div css={upgradeTitleStyle}>
                    {t("billing.modal.upgrade_now_admin.upgrade_to_plus")}
                  </div>
                  <div>{t("billing.advanced.feature")}</div>
                  <Button
                    mt="8px"
                    colorScheme="techPurple"
                    leftIcon={<UpgradeIcon />}
                    onClick={handleUpgradeModal}
                  >
                    {t("billing.homepage.upgrade")}
                  </Button>
                </div>
              )
            }
          >
            <div css={deployLogoStyle}>
              <span>Powered by</span>
              <Logo css={logoStyle} />
              <DownIcon ml="8px" css={applyPopupStateStyle(popupVisible)} />
            </div>
          </Trigger>
        ) : (
          <WaterMark />
        )
      ) : (
        <WaterMark />
      )}
    </div>
  )
}

export default Deploy

Deploy.displayName = "Deploy"
