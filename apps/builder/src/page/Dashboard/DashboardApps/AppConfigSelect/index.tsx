import { FC, HTMLAttributes, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { DownIcon, Trigger, UpIcon } from "@illa-design/react"
import { ReactComponent as CheckmarkIcon } from "@/illa-public-component/RoleSelect/assets/success.svg"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { updateAppPublicConfig } from "@/services/apps"
import {
  optionContentStyle,
  optionItemStyle,
  pointerStyle,
  valueLabelStyle,
} from "./style"

interface AppConfigSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  canEditApp: boolean
  appId: string
  isPublic: boolean
}

const AppConfigSelect: FC<AppConfigSelectProps> = (props) => {
  const { className, canEditApp, appId, isPublic } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [popupVisible, setPopupVisible] = useState<boolean>()

  const canChange = useMemo(() => {
    return canEditApp
  }, [canEditApp])

  const options: { label: string; value: boolean }[] = useMemo(() => {
    return [
      {
        label: t("new_dashboard.access.private"),
        value: false,
      },
      {
        label: t("new_dashboard.access.public"),
        value: true,
      },
    ]
  }, [t])

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

  if (!canChange) {
    return (
      <div css={valueLabelStyle} className={className}>
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
          {options.map((option) => {
            return (
              <div
                css={optionItemStyle}
                key={option.label}
                onClick={() => {
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
      <div css={[valueLabelStyle, pointerStyle]} className={className}>
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
