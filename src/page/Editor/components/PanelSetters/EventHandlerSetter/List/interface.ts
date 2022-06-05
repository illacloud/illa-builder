import {
  ActionsProps,
  BaseEventItem,
} from "@/page/Editor/components/PanelSetters/EventHandlerSetter/interface"
import { PanelFieldConfig } from "@/page/Editor/components/InspectPanel/interface"
import { EventsInProps } from "@/wrappedComponents/DraggableComponent/interface"

export interface ActionMenuProps {
  index: number
  handleCopyItem: (index: number) => void
  handleCloseMode: () => void
  handleDeleteItem: (index: number) => void
}

export interface ListProps {
  events: BaseEventItem[]
  childrenSetter?: PanelFieldConfig[]
  handleUpdate: (
    events: BaseEventItem[],
    dslValue?: Record<string, any>,
  ) => void
  dslEvents: EventsInProps[]
}

export interface ListItemProps extends ActionsProps {
  index: number
  event: BaseEventItem
  childrenSetter?: PanelFieldConfig[]
}
