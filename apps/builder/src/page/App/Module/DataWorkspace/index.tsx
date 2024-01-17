import { FC } from "react"
import { leftPanelStyle } from "../../style"
import { ActionSpaceTree } from "./components/ActionSpaceTree"
import { ComponentSpaceTree } from "./components/ComponentSpaceTree"
import { GlobalsSpaceTree } from "./components/GlobalsSpaceTree"
import { LibrarySpaceTree } from "./components/LibrariesTree"
import { PageSpaceTree } from "./components/PageSpaceTree"
import { innerContainerStyle } from "./style"

export const DataWorkspace: FC = () => {
  return (
    <div css={leftPanelStyle}>
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
