import { FC } from "react"
import { TitleInput } from "@/page/App/components/ActionEditor/ActionEditorPanel/TitleInput"
import { ActionEditorHeaderMoreButton } from "./moreActionButton"
import { headerStyle } from "./style"
import { RunActionButton } from "./runActionButton"

export const ActionEditorHeader: FC = () => {
  return (
    <header css={headerStyle}>
      <TitleInput />
      <div>
        <ActionEditorHeaderMoreButton />
        <RunActionButton />
      </div>
    </header>
  )
}

ActionEditorHeader.displayName = "ActionEditorHeader"
