import { FC, HTMLAttributes } from "react"
import { ActionList } from "./ActionList"
import { ActionPanel } from "./ActionPanel"
import {
  actionEditorDragBarStyle,
  applyActionEditorStyle,
  contentContainerStyle,
} from "./styles"
import { Divider } from "@illa-design/divider"

export const ActionEditor: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className={props.className} css={applyActionEditorStyle(300)}>
      <div css={actionEditorDragBarStyle} />
      <Divider direction="horizontal" />
      <div css={contentContainerStyle}>
        <ActionList />
        <ActionPanel />
      </div>
    </div>
  )
}

ActionEditor.displayName = "ActionEditor"
