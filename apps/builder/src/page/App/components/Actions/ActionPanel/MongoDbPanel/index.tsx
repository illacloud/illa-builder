import { FC } from "react"
import { MongoDbPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { mongoContainerStyle } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel/style"

export const MongoDbPanel: FC<MongoDbPanelProps> = (props) => {
  const currentAction = props.action

  return (
    <div css={mongoContainerStyle}>
      <ResourceChoose action={currentAction} />
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MongoDbPanel.displayName = "MongoDbPanel"
