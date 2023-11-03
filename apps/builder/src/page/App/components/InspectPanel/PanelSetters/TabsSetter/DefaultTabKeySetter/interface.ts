import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface TabsDefaultKeySetterProps extends BaseSetter {
  value?: string
  expectedType?: VALIDATION_TYPES
}
