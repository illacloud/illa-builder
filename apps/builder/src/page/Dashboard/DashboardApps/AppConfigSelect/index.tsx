import { UpgradeIcon } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canUseUpgradeFeature } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, ReactNode, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DownIcon, SuccessIcon, Tag, Trigger, UpIcon } from "@illa-design/react"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { updateAppPublicConfig } from "@/services/apps"
import { track } from "@/utils/mixpanelHelper"
import { isILLAAPiError } from "@/utils/typeHelper"
import {
  optionContentStyle,
  optionItemStyle,
  pointerStyle,
  valueLabelStyle,
} from "./style"

interface AppConfigSelectProps {
  canEditApp: boolean
  appId: string
  isPublic: boolean
  isDeployed: boolean
}

export const AppConfigSelect: FC<AppConfigSelectProps> = (props) => {
  const { canEditApp, appId, isPublic, isDeployed } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const teamInfo = useSelector(getCurrentTeamInfo)

  const upgradeModal = useUpgradeModal()

  const [popupVisible, setPopupVisible] = useState<boolean>()

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const options: { label: ReactNode; value: boolean }[] = useMemo(() => {
    return [
      {
        label: t("new_dashboard.access.private"),
        value: false,
      },
      {
        label: (
          <div>
            {t("new_dashboard.access.public")}
            {!canUseBillingFeature && (
              <Tag ml="8px" colorScheme="techPurple">
                <UpgradeIcon /> {t("billing.homepage.upgrade")}
              </Tag>
            )}
          </div>
        ),
        value: true,
      },
    ]
  }, [t, canUseBillingFeature])

  const updateAppConfig = async (isPublic: boolean) => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.REQUEST,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      {
        element: "invite_modal_public_switch",
        parameter1: "dashboard",
        parameter2: "trigger",
        parameter4: !isPublic ? "on" : "off",
        parameter5: appId,
      },
    )
    try {
      await updateAppPublicConfig(isPublic, appId)
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.REQUEST,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        {
          element: "invite_modal_public_switch",
          parameter1: "dashboard",
          parameter2: "suc",
          parameter4: !isPublic ? "on" : "off",
          parameter5: appId,
        },
      )
      dispatch(
        dashboardAppActions.updateDashboardAppPublicReducer({
          appId,
          isPublic,
        }),
      )
    } catch (e) {
      console.error(e)
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.REQUEST,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        {
          element: "invite_modal_public_switch",
          parameter2: "failed",
          parameter3: isILLAAPiError(e) ? e?.data?.errorFlag : "unknown",
          parameter4: !isPublic ? "on" : "off",
          parameter5: appId,
        },
      )
    }
  }

  const onVisibleChange = (visible: boolean) => {
    if (popupVisible !== visible) {
      setPopupVisible(visible)
    }
  }

  if (!canEditApp || !isDeployed) {
    return (
      <div css={valueLabelStyle}>
        {isPublic
          ? t("new_dashboard.access.public")
          : t("new_dashboard.access.private")}
      </div>
    )
  }

  return (
    <Trigger
      trigger="click"
      colorScheme="white"
      position="bottom-start"
      withoutPadding
      showArrow={false}
      popupVisible={popupVisible}
      onVisibleChange={onVisibleChange}
      content={
        <div css={optionContentStyle}>
          {options.map((option, index) => {
            return (
              <div
                css={optionItemStyle}
                key={index}
                onClick={() => {
                  if (isCloudVersion && !canUseBillingFeature) {
                    upgradeModal({
                      modalType: "upgrade",
                    })
                    return
                  }
                  onVisibleChange(false)
                  updateAppConfig(option.value)
                }}
              >
                {option.label}
                {option.value === isPublic && <SuccessIcon />}
              </div>
            )
          })}
        </div>
      }
    >
      <div css={[valueLabelStyle, pointerStyle]}>
        {isPublic
          ? t("new_dashboard.access.public")
          : t("new_dashboard.access.private")}
        {popupVisible ? <UpIcon /> : <DownIcon />}
      </div>
    </Trigger>
  )
}

AppConfigSelect.displayName = "AppConfigSelect"
