import { DynamicMenu, MenuItemShape } from "@illa-public/cloud-dashboard-layout"
import { USER_ROLE } from "@illa-public/public-types"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import ResourceIcon from "@/assets/icon/workspace/resource.svg?react"
import AppIcon from "@/assets/icon/workspace/workspace.svg?react"
import { DashBoardDynamicMenuProps } from "./interface"

export const DashBoardDynamicMenu: FC<DashBoardDynamicMenuProps> = (props) => {
  const { onClickMenuItemCallback } = props
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const { pathname } = useLocation()
  const { teamIdentifier } = useParams()
  const { t } = useTranslation()
  // talvez ajude
  const dynamicMenuConfig: MenuItemShape[] = [
    {
      labelKey: "app",
      labelName: t("page.workspace.menu.apps"), // Marcus
      href: `/workspace/${teamIdentifier}/apps`,
      inStation: true,
      icon: <AppIcon />,
      onClickCallback: onClickMenuItemCallback,
      hidden: !teamIdentifier,
    },
    {
      labelKey: "resource",
      labelName: t("page.workspace.menu.resources"), // Marcus
      href: `/workspace/${teamIdentifier}/resources`,
      inStation: true,
      icon: <ResourceIcon />,
      hidden:
        !teamIdentifier ||
        ![USER_ROLE.OWNER, USER_ROLE.ADMIN, USER_ROLE.EDITOR].includes(
          currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
        ),
      onClickCallback: onClickMenuItemCallback,
    },

    {
      labelKey: "TeamManagement",
      labelName: t("page.workspace.menu.TeamManagement"), // Marcus
      href: `/workspace/${teamIdentifier}/resources`,
      inStation: true,
      icon: <AppIcon />,
      hidden:
        !teamIdentifier ||
        ![USER_ROLE.OWNER, USER_ROLE.ADMIN, USER_ROLE.EDITOR].includes(
          // Mexer aqui
          currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
        ),
      onClickCallback: onClickMenuItemCallback,
    },
  ]

  const selectedKey = dynamicMenuConfig.find((item) =>
    pathname.includes(item.href ?? ""),
  )?.labelKey

  return <DynamicMenu config={dynamicMenuConfig} selectedKey={selectedKey} />
}
