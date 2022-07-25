import { FC } from "react"
import { ActionPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { TransformerAction } from "@/redux/currentApp/action/actionState"

export const TransformerPanel: FC<ActionPanelProps<TransformerAction>> = () => {
  return <div></div>
}

TransformerPanel.displayName = "TransformerPanel"
