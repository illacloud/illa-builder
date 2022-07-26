import { ActionTypeInfo } from "@/page/App/components/Actions/ActionGenerator/ActionTypeSelector/interface"

export interface ActionInfo extends ActionTypeInfo {
  resourceId?: string
}

export interface ActionGeneratorProps {
  visible?: boolean
  onClose: () => void
}
