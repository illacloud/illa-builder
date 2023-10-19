import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { MobileResourcesWorkspace } from "./mobile"
import { PCResourcesWorkspace } from "./pc"

export * from "./pc"

const ResourceWorkspaceLanding: FC = () => {
  return (
    <LayoutAutoChange
      desktopPage={<PCResourcesWorkspace />}
      mobilePage={<MobileResourcesWorkspace />}
    />
  )
}

export default ResourceWorkspaceLanding
