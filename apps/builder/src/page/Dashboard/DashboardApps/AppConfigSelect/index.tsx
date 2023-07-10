import { FC, ReactNode, useContext, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DownIcon, Tag, Trigger, UpIcon } from "@illa-design/react"
import { UpgradeIcon } from "@/illa-public-component/Icon/upgrade"
import { ReactComponent as CheckmarkIcon } from "@/illa-public-component/RoleSelect/assets/success.svg"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import { canUseUpgradeFeature } from "@/illa-public-component/UserRoleUtils"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { updateAppPublicConfig } from "@/services/apps"
import { isCloudVersion } from "@/utils/typeHelper"
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

const AppConfigSelect: FC<AppConfigSelectProps> = (props) => {
  const { canEditApp, appId, isPublic, isDeployed } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const teamInfo = useSelector(getCurrentTeamInfo)
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [popupVisible, setPopupVisible] = useState<boolean>()

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
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
    const res = await updateAppPublicConfig(isPublic, appId)
    dispatch(
      dashboardAppActions.modifyConfigDashboardAppReducer({
        appId,
        config: { public: isPublic },
      }),
    )
    return res
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
                    handleUpgradeModalVisible(true, "upgrade")
                    return
                  }
                  onVisibleChange(false)
                  updateAppConfig(option.value)
                }}
              >
                {option.label}
                {option.value === isPublic && <CheckmarkIcon />}
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

export default AppConfigSelect
