import { PanelLabelProps } from "../../InspectPanel/interface"

export interface TextValueSetterProps extends PanelLabelProps {
  defaultTextValue: string
  defaultTextModelValue: boolean
  handleChangeTextValue: (value: string) => void
  handleChangeTextMode: (value: boolean) => void
}
