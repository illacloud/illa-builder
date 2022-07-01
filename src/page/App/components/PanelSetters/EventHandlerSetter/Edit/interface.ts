import { BaseEventItem } from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export interface IEventHandleProps {
  event: BaseEventItem
  handleCloseModal: () => void
  childrenSetter?: PanelFieldConfig[]
  handleUpdateItem: (value: any) => void
  attrName: string
}
