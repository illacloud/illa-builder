import { BaseEventItem } from "@/page/Editor/components/PanelSetters/EventHandlerSetter/interface"
import { PanelFieldConfig } from "@/page/Editor/components/InspectPanel/interface"

export interface IEventHandleProps {
  event: BaseEventItem
  handleCloseModal: () => void
  childrenSetter?: PanelFieldConfig[]
  handleUpdateItem: (value: any) => void
}
