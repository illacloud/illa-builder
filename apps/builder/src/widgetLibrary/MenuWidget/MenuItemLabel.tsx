import { FC } from "react"
import { MenuItemLabelProps } from "@/widgetLibrary/MenuWidget/interface"
import {
  applyMenuItemIconStyle,
  menuItemLabelStyle,
} from "@/widgetLibrary/MenuWidget/style"

export const MenuItemLabel: FC<MenuItemLabelProps> = (props) => {
  const { title, icon, mode } = props
  return (
    <span css={menuItemLabelStyle}>
      {icon ? (
        <img css={applyMenuItemIconStyle(mode)} src={icon} alt={title} />
      ) : null}
      {title}
    </span>
  )
}

MenuItemLabel.displayName = "MenuItemLabel"
