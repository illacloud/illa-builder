import { getILLACloudURL } from "@illa-public/utils"
import { FC } from "react"
import { Link, Outlet } from "react-router-dom"
import Logo from "@/assets/illa-logo.svg?react"
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
        <Link to={getILLACloudURL(window.customDomain)}>
          <Logo css={iconStyle} />
        </Link>
      </header>
      <aside css={asideContainerStyle}>
        <Outlet />
      </aside>
    </div>
  )
}
