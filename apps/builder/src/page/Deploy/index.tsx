import { FC, Suspense, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Await, useLoaderData } from "react-router-dom"
import { Button, DownIcon, Switch, Trigger } from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { FullPageLoading } from "@/components/FullPageLoading"
import { UpgradeIcon } from "@/illa-public-component/Icon/upgrade"
import { canManage } from "@/illa-public-component/UserRoleUtils"
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
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import Page404 from "../status/404"
import { DeployContent } from "./content"

export const Deploy: FC = () => {
  const currentApp = useSelector(getAppInfo)
  const removeWaterMark = useSelector(getCurrentAppWaterMarkConfig)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const data = useLoaderData()

  // [TODO] billing
  const paymentStatus = true
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
      <Trigger
        trigger="click"
        colorScheme="white"
        withoutPadding
        withoutShadow
        position="top-end"
        mb={"12px"}
        showArrow={false}
        popupVisible={popupVisible}
        onVisibleChange={updateWaterMarkConfigVisible}
        content={
          paymentStatus ? (
            <div css={upgradeConfigStyle}>
              Remove watermark
              <Switch
                checked={removeWaterMark}
                onChange={() => {
                  // change config
                }}
              />
            </div>
          ) : (
            <div css={upgradePopContainerStyle}>
              <div css={upgradeTitleStyle}>Upgrade to Plus</div>
              <div>Remove watermark</div>
              <Button mt="8px" colorScheme="techPurple">
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
    </div>
  )
}

export default Deploy

Deploy.displayName = "Deploy"
