import { UpgradeIcon } from "@illa-public/icon"
import { USER_ROLE } from "@illa-public/public-types"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  canUseUpgradeFeature,
} from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, DownIcon, Switch, Trigger } from "@illa-design/react"
import Logo from "@/assets/illa-logo.svg?react"
import { getCurrentAppWaterMarkConfig } from "@/redux/currentApp/appInfo/appInfoSelector"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { updateWaterMarkConfig } from "@/services/apps"
import {
  applyPopupStateStyle,
  deployLogoStyle,
  logoStyle,
  upgradeConfigStyle,
  upgradePopContainerStyle,
  upgradeTitleStyle,
} from "./style"

export const WaterMark: FC = () => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  const upgradeModal = useUpgradeModal()
  const { t } = useTranslation()
  const teamInfo = useSelector(getCurrentTeamInfo)
  const waterMark = useSelector(getCurrentAppWaterMarkConfig)
  const { appId } = useParams()

  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER
  const canUseBillingFeature = canUseUpgradeFeature(
    currentUserRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const canUpdateAppWaterMark = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.EDIT_APP,
  )

  const handleUpgradeModal = () => {
    if (!canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
        from: "deploy_watermark",
      })
    }
  }

  const handleWaterMarkChange = useCallback(
    async (value: boolean, event: React.MouseEvent<Element, MouseEvent>) => {
      if (appId) {
        event.stopPropagation()
        const res = await updateWaterMarkConfig(!value, appId)
        dispatch(appInfoActions.updateAppInfoReducer(res.data))
      }
    },
    [appId, dispatch],
  )

  return (
    <>
      {waterMark && (
        <Trigger
          trigger="click"
          colorScheme="white"
          position="top-end"
          mb={"12px"}
          popupVisible={popupVisible}
          onVisibleChange={setPopupVisible}
          disabled={!isCloudVersion || !canUpdateAppWaterMark}
          content={
            canUseBillingFeature ? (
              <div css={upgradeConfigStyle}>
                {t("billing.advanced.feature")}
                <Switch checked={!waterMark} onChange={handleWaterMarkChange} />
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
                  onClick={() => {
                    handleUpgradeModal()
                  }}
                  leftIcon={<UpgradeIcon />}
                >
                  {t("billing.homepage.upgrade")}
                </Button>
              </div>
            )
          }
        >
          <div
            css={deployLogoStyle}
            onClick={() => {
              if (!isCloudVersion || !canUpdateAppWaterMark) {
                window.open("https://illacloud.com", "_blank")
              }
            }}
          >
            <span>Powered by</span>
            <Logo css={logoStyle} />
            {isCloudVersion && canUpdateAppWaterMark && (
              <DownIcon css={applyPopupStateStyle(popupVisible)} />
            )}
          </div>
        </Trigger>
      )}
    </>
  )
}

WaterMark.displayName = "WaterMark"
