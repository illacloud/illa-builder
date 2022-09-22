import { PanelLabelProps } from "@/page/App/components/InspectPanel/interface"

export interface AddActionLabelProps
  extends Pick<PanelLabelProps, "labelName" | "labelDesc"> {
  handleAddItem: () => void
}
