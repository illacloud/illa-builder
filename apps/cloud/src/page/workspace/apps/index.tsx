import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { MobileAppWorkspace } from "./mobile"
import { PCAppWorkspace } from "./pc"

export * from "./pc"

const AppWorkspaceLanding: FC = () => {
  return (
    <LayoutAutoChange
      desktopPage={<PCAppWorkspace />}
      mobilePage={<MobileAppWorkspace />}
    />
  )
}

export default AppWorkspaceLanding
