import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
  expectedType?: VALIDATION_TYPES
  value?: string
  wrappedCodeFunc?: (code: string) => string
}
