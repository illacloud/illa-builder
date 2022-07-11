import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"

export interface EventHandlerSetterHeaderProps
  extends Pick<PanelLabelProps, "labelName" | "labelDesc"> {
  handleAddItemAsync: () => void
}

export interface EventAndMethodLabelProps {
  index: number
}

export interface MoreProps {
  index: number
}

export interface ListBodyProps {
  events: any[]
}

export interface ListItemProps {
  index: number
}
