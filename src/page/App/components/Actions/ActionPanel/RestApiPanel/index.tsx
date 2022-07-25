import { FC } from "react"
import { ActionPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { RestApiAction } from "@/redux/currentApp/action/actionState"

export const RestApiPanel: FC<ActionPanelProps<RestApiAction>> = () => {
  return <div></div>
}

RestApiPanel.displayName = "RestApiPanel"
