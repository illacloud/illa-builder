import { FC, HTMLAttributes } from "react"
import { ActionSpaceTree } from "./components/ActionSpaceTree"
import { ComponentSpaceTree } from "./components/ComponentSpaceTree"
import { GlobalsSpaceTree } from "./components/GlobalsSpaceTree"
import { LibrarySpaceTree } from "./components/LibrariesTree"
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
      <LibrarySpaceTree />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
