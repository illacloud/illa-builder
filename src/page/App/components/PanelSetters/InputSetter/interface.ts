import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
  isInList?: boolean
  handleUpdateDynamicStrings: (action: "add" | "delete", value: string) => void
}
