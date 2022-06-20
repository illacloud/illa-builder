import { FC } from "react"
import { Outlet } from "react-router-dom"
import { ReactComponent as Logo } from "@/assets/illa-logo-white.svg"
import {
  asideStyle,
  containerStyle,
  contentStyle,
  introductionStyle,
  logoStyle,
} from "./style"

export const UserLogin: FC = () => {
  return (
    <div css={containerStyle}>
      <aside css={asideStyle}>
        <Logo css={logoStyle} />
        <section css={introductionStyle}>
          An open-source low-code Platform for Developers.
        </section>
      </aside>
      <div css={contentStyle}>
        <Outlet />
      </div>
    </div>
  )
}

UserLogin.displayName = "UserLogin"
