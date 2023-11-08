import { FC, HTMLAttributes } from "react"
import { ActionSpaceTree } from "./components/ActionSpaceTree"
import { ComponentSpaceTree } from "./components/ComponentSpaceTree"
import { GlobalsSpaceTree } from "./components/GlobalsSpaceTree"
import { LibrarySpaceTree } from "./components/LibrariesTree"
import { PageSpaceTree } from "./components/PageSpaceTree"
import { innerContainerStyle } from "./style"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      <div css={innerContainerStyle}>
        <PageSpaceTree />
        <ComponentSpaceTree />
        <ActionSpaceTree />
        <GlobalsSpaceTree />
        <LibrarySpaceTree />
      </div>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
