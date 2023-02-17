import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { EventHandlerConfig } from "@/widgetLibrary/interface"

export interface NewBaseEventHandlerSetterProps
  extends BaseSetter,
    PanelLabelProps {
  childrenSetter?: PanelFieldConfig[]
  eventHandlerConfig?: EventHandlerConfig
  // TODO: not use any
  value?: any
}
