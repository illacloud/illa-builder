import { get } from "lodash"
import {
  PanelConfig,
  PanelFieldGroupConfig,
} from "@/page/App/components/InspectPanel/interface"
import { isObject } from "@/utils/typeHelper"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

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

        if (Array.isArray(attrPath)) {
          const expectedType = filedConfig.expectedType
          if (Array.isArray(expectedType)) {
            attrPath.forEach((path, i) => {
              configValidationPaths[path] = expectedType[i]
            })
          } else if (expectedType) {
            attrPath.forEach((path) => {
              configValidationPaths[path] = expectedType
            })
          }
        } else {
          if (filedConfig.expectedType) {
            const expectedType = filedConfig.expectedType

            if (Array.isArray(expectedType)) {
              configValidationPaths[attrPath] = expectedType[0]
            } else if (expectedType) {
              configValidationPaths[attrPath] = expectedType
            }
          }
        }

        if (filedConfig.childrenSetter) {
          const basePropertyPath = filedConfig.attrName
          const widgetPropertyValue = get(widgetOrAction, basePropertyPath, [])
          if (Array.isArray(widgetPropertyValue)) {
            Object.keys(widgetPropertyValue).forEach((key) => {
              const objectIndexPropertyPath = `${basePropertyPath}.${key}`
              filedConfig.childrenSetter?.forEach((childConfig) => {
                const childAttrPath = childConfig.attrName
                const expectedType = childConfig.expectedType
                if (Array.isArray(childAttrPath)) {
                  if (Array.isArray(expectedType)) {
                    childAttrPath.forEach((path, i) => {
                      configValidationPaths[
                        `${objectIndexPropertyPath}.${path}`
                      ] = expectedType[i]
                    })
                  } else if (expectedType) {
                    childAttrPath.forEach((path) => {
                      configValidationPaths[
                        `${objectIndexPropertyPath}.${path}`
                      ] = expectedType
                    })
                  }
                } else {
                  if (expectedType) {
                    if (Array.isArray(expectedType)) {
                      configValidationPaths[
                        `${objectIndexPropertyPath}.${childAttrPath}`
                      ] = expectedType[0]
                    } else if (expectedType) {
                      configValidationPaths[
                        `${objectIndexPropertyPath}.${childAttrPath}`
                      ] = expectedType
                    }
                  }
                }
              })
            })
          }
          if (isObject(widgetPropertyValue)) {
            Object.keys(widgetPropertyValue).forEach((key) => {
              const objectIndexPropertyPath = `${basePropertyPath}.${key}`
              filedConfig.childrenSetter?.forEach((childConfig) => {
                const expectedType = childConfig.expectedType
                if (!Array.isArray(expectedType) && expectedType) {
                  configValidationPaths[objectIndexPropertyPath] = expectedType
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
