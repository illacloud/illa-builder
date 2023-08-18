import { UpgradeIcon } from "@illa-public/icon"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { USER_ROLE, getCurrentTeamInfo } from "@illa-public/user-data"
import { canManage, canUseUpgradeFeature } from "@illa-public/user-role-utils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
} from "@illa-public/user-role-utils/interface"
import { isCloudVersion } from "@illa-public/utils"
import {
  FC,
  HTMLAttributes,
  MouseEvent,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Await, useLoaderData, useParams } from "react-router-dom"
import { Button, DownIcon, Switch, Trigger } from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { FullPageLoading } from "@/components/FullPageLoading"
import {
  applyPopupStateStyle,
  deployContainerStyle,
  deployLogoStyle,
  logoStyle,
  upgradeConfigStyle,
  upgradePopContainerStyle,
  upgradeTitleStyle,
} from "@/page/Deploy/style"
import Page404 from "@/page/Status/404"
import {
  getAppInfo,
  getCurrentAppWaterMarkConfig,
} from "@/redux/currentApp/appInfo/appInfoSelector"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { updateWaterMarkConfig } from "@/services/apps"
import { DeployContent } from "./content"

const WaterMark: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { onClick, ...rest } = props
  return (
    <div
      css={deployLogoStyle}
      onClick={(e) => {
        onClick && onClick(e)
        window.open("https://illacloud.com", "_blank")
      }}
      {...rest}
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
  const upgradeModal = useUpgradeModal()

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
        const res = await updateWaterMarkConfig(!value, appId)
        dispatch(appInfoActions.updateAppInfoReducer(res.data))
      }
    },
    [appId, dispatch],
  )

  const handleUpgradeModal = useCallback(() => {
    if (!canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
      })
    }
  }, [canUseBillingFeature, upgradeModal])

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
        waterMark ? (
          canUpdateAppWaterMark ? (
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
                    {t("billing.advanced.feature")}
                    <Switch
                      checked={!waterMark}
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
        ) : null
      ) : (
        <WaterMark />
      )}
    </div>
  )
}

export default Deploy

Deploy.displayName = "Deploy"
