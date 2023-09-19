import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/components/Label/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export interface NewBaseEventHandlerSetterProps
  extends BaseSetter,
    PanelLabelProps {
  childrenSetter?: PanelFieldConfig[]
  eventHandlerConfig?: EventHandlerConfig
  // TODO: not use any
  value?: any
}
