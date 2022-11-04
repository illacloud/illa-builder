import { createContext } from "react"
import { ActionPanelContextProps } from "@/page/App/components/Actions/ActionPanel/interface"

export const ActionPanelContext = createContext<ActionPanelContextProps>({})

ActionPanelContext.displayName = "ActionPanelContext"
