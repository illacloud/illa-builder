import { PanelLabelProps } from "../../../components/Label/interface"
import { BaseSetter } from "../../interface"

export interface FileMinMaxSetterProps extends BaseSetter, PanelLabelProps {
  placeholder?: string
}
