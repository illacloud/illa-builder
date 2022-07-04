import {
  PanelConfig,
  PanelFieldGroupConfig,
} from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { get, isObject } from "lodash"

export const generateAllTypePathsFromWidgetConfig = (
  panelConfig: PanelConfig[],
  widgetOrAction: Record<string, any>,
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
          const basePropertyPath = filedConfig.attrName
          const widgetPropertyValue = get(widgetOrAction, basePropertyPath, [])
          if (isObject(widgetPropertyValue)) {
            Object.keys(widgetPropertyValue).forEach((key) => {
              const objectIndexPropertyPath = `${basePropertyPath}.${key}`
              filedConfig.childrenSetter?.forEach((childConfig) => {
                const childAttrPath = childConfig.attrName
                if (childConfig.expectedType) {
                  configValidationPaths[
                    `${objectIndexPropertyPath}.${childAttrPath}`
                  ] = childConfig.expectedType
                }
              })
            })
          }
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
