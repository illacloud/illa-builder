import IconHotSpot from "@illa-public/icon-hot-spot"
import { isILLAAPiError } from "@illa-public/illa-net"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canUseUpgradeFeature } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, MouseEvent, memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  Switch,
  getColor,
  useMessage,
} from "@illa-design/react"
import { UpgradeTag } from "@/components/UpgradeTag"
import {
  getAppInfo,
  getCurrentAppWaterMarkConfig,
} from "@/redux/currentApp/appInfo/appInfoSelector"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { updateWaterMarkConfig } from "@/services/apps"
import { takeSnapShot } from "@/services/history"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { isMAC } from "@/utils/userAgent"
import { keyTextStyle, spaceBetweenStyle, upgradeStyle } from "./style"
import { duplicateApp } from "./utils"

const MoreActionButton: FC = () => {
  const { teamIdentifier, appId } = useParams()
  const [duplicateLoading, setDuplicateLoading] = useState(false)

  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const upgradeModal = useUpgradeModal()

  const appInfo = useSelector(getAppInfo)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const waterMark = useSelector(getCurrentAppWaterMarkConfig)

  const message = useMessage()

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const handleDropdownVisibleChange = (visible: boolean) => {
    if (visible) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
        element: "app_duplicate",
        parameter5: appId,
      })
    }
  }

  const handleDuplicateApp = async () => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "app_duplicate",
      parameter5: appId,
    })
    if (duplicateLoading) return
    setDuplicateLoading(true)
    try {
      const response = await duplicateApp(appInfo.appId, appInfo.appName)
      navigate(`/${teamIdentifier}/app/${response.data.appId}`)
    } catch (error) {
      if (isILLAAPiError(error)) {
        message.error({ content: t("dashboard.app.duplicate_fail") })
      } else {
        message.error({ content: t("network_error") })
      }
    } finally {
      setDuplicateLoading(false)
    }
  }

  const handleSaveToHistory = async () => {
    if (appId) {
      try {
        await takeSnapShot(appId)
        message.success({ content: t("editor.history.message.suc.save") })
      } catch (error) {
        if (isILLAAPiError(error)) {
          message.error({ content: t("editor.history.message.fail.save") })
        } else {
          message.error({ content: t("network_error") })
        }
      }
    }
  }

  const handleWaterMarkChange = async (value: boolean, event: MouseEvent) => {
    if (appId) {
      event.stopPropagation()
      const res = await updateWaterMarkConfig(!value, appId)
      dispatch(appInfoActions.updateAppInfoReducer(res.data))
    }
  }

  const checkUpgrade = () => {
    if (!canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
        from: "app_edit_more_watermark",
      })
    }
  }

  return (
    <Dropdown
      position="bottom-end"
      trigger="click"
      triggerProps={{ closeDelay: 0, openDelay: 0 }}
      onVisibleChange={handleDropdownVisibleChange}
      dropList={
        <DropList>
          <DropListItem
            key="duplicate"
            value="duplicate"
            title={t("duplicate")}
            onClick={handleDuplicateApp}
          />
          {isCloudVersion && (
            <>
              {canUseBillingFeature && (
                <DropListItem
                  key="saveHistory"
                  value="saveHistory"
                  title={
                    <div css={spaceBetweenStyle}>
                      <span>{t("editor.history.save")}</span>
                      <span css={keyTextStyle}>
                        {isMAC()
                          ? t("editor.history.save_keyboard.cmds")
                          : t("editor.history.save_keyboard.ctrls")}
                      </span>
                    </div>
                  }
                  onClick={handleSaveToHistory}
                />
              )}
              <DropListItem
                key="configWaterMark"
                value="configWaterMark"
                title={
                  <span css={upgradeStyle}>
                    {t("billing.advanced.feature")}
                    {canUseBillingFeature ? (
                      <Switch
                        checked={!waterMark}
                        onChange={handleWaterMarkChange}
                      />
                    ) : (
                      <UpgradeTag />
                    )}
                  </span>
                }
                onClick={checkUpgrade}
              />
            </>
          )}
        </DropList>
      }
    >
      <IconHotSpot>
        <MoreIcon color={getColor("grayBlue", "02")} />
      </IconHotSpot>
    </Dropdown>
  )
}

export default memo(MoreActionButton)
