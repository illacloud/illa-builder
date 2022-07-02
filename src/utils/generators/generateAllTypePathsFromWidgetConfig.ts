import {
  PanelConfig,
  PanelFieldGroupConfig,
} from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const generateAllTypePathsFromWidgetConfig = (
  panelConfig: PanelConfig[],
) => {
  let validationPaths: Record<string, VALIDATION_TYPES> = {}
  panelConfig.forEach((config) => {
    if ((config as PanelFieldGroupConfig).children) {
      const filedConfigs = (config as PanelFieldGroupConfig).children
      filedConfigs.forEach((filedConfig) => {
        const attrPath = filedConfig.attrName

        const configValidationPaths: Record<string, VALIDATION_TYPES> = {}
        if (filedConfig.expectedType) {
          configValidationPaths[attrPath] = filedConfig.expectedType
        }

        if (filedConfig.childrenSetter) {
          filedConfig.childrenSetter.forEach((childConfig) => {
            const childAttrPath = childConfig.attrName
            if (childConfig.expectedType) {
              configValidationPaths[`${attrPath}.${childAttrPath}`] =
                childConfig.expectedType
            }
          })
        }
        validationPaths = {
          ...validationPaths,
          ...configValidationPaths,
        }
      })
    }
  })

  return { validationPaths }
}
