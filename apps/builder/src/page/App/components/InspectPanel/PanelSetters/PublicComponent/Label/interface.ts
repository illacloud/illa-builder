import { PanelLabelProps } from "@/page/App/components/InspectPanel/components/Label/interface"

export interface AddActionLabelProps
  extends Pick<PanelLabelProps, "labelName" | "labelDesc"> {
  handleAddItem: () => void
}
