import { FC } from "react"
import { TitleInput } from "@/page/App/components/ActionEditor/ActionEditorPanel/TitleInput"
import { ActionEditorHeaderMoreButton } from "./moreActionButton"
import { headerStyle } from "./style"
import { RunActionButton } from "./runActionButton"
import { ActionEditorHeaderProps } from "./interface"

export const ActionEditorHeader: FC<ActionEditorHeaderProps> = (props) => {
  const { onDuplicateActionItem, onDeleteActionItem } = props

  return (
    <header css={headerStyle}>
      <TitleInput />
      <div>
        <ActionEditorHeaderMoreButton
          onDuplicateActionItem={onDuplicateActionItem}
          onDeleteActionItem={onDeleteActionItem}
        />
        <RunActionButton />
      </div>
    </header>
  )
}

ActionEditorHeader.displayName = "ActionEditorHeader"
