import { FC, HTMLAttributes } from "react"
import { ActionSpaceTree } from "@/page/App/components/DataWorkspace/components/ActionSpaceTree"
import { ComponentSpaceTree } from "@/page/App/components/DataWorkspace/components/ComponentSpaceTree"
import { GlobalsSpaceTree } from "@/page/App/components/DataWorkspace/components/GlobalsSpaceTree"
import { PageSpaceTree } from "./components/PageSpaceTree"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      <PageSpaceTree />
      <ComponentSpaceTree />
      <ActionSpaceTree />
      <GlobalsSpaceTree />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
