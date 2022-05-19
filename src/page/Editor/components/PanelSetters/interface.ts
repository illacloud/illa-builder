import { PanelLabelProps } from "../InspectPanel/interface"

export interface BaseSetterProps extends PanelLabelProps {
  handleChange: (value: string | boolean, attrName?: string) => void
  isInList?: boolean
}
