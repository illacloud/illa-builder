import { FC } from "react"
import { Outlet } from "react-router-dom"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import {
  asideContainerStyle,
  headerContainerStyle,
  iconStyle,
  resourceLayoutContainerStyle,
} from "./style"

export const ResourceLayout: FC = () => {
  return (
    <div css={resourceLayoutContainerStyle}>
      <header css={headerContainerStyle}>
        <Logo css={iconStyle} />
      </header>
      <aside css={asideContainerStyle}>
        <Outlet />
      </aside>
    </div>
  )
}
