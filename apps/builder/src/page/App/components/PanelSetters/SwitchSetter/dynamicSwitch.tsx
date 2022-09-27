import { FC, useCallback } from "react"
import { get } from "lodash"
import { FxIcon } from "@illa-design/icon"
import { Switch } from "@illa-design/switch"
import { DynamicSwitchProps } from "./interface"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import {
  applyCustomIconStyle,
  applyLabelWrapperStyle,
  customAndSwitchWrapperStyle,
  dynamicSwitchInputStyle,
  dynamicSwitchWrapperStyle,
} from "./style"
import { BaseInput } from "../InputSetter/baseInput"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { DynamicIcon } from "@/page/App/components/PanelSetters/PublicComponent/DynamicIcon"

export const DynamicSwitchSetter: FC<DynamicSwitchProps> = props => {
  const {
    attrName,
    labelName,
    labelDesc,
    panelConfig,
    handleUpdateDsl,
    value,
    widgetDisplayName,
    expectedType,
    widgetOrAction,
    openDynamic,
  } = props

  const dynamicAttrPath = get(panelConfig, "$dynamicAttrPaths", [])

  const customSelected = dynamicAttrPath.includes(attrName)

  const handleClickDynamicIcon = useCallback(() => {
    if (customSelected) {
      handleUpdateDsl(attrName, false)
    } else {
      handleUpdateDsl(attrName, `{{false}}`)
    }
  }, [attrName, customSelected, handleUpdateDsl])

  return (
    <div css={applyLabelWrapperStyle(customSelected)}>
      <div css={dynamicSwitchWrapperStyle}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <div css={customAndSwitchWrapperStyle}>
          {openDynamic && (
            <DynamicIcon
              isDynamic={customSelected}
              hasRightContent
              onClick={handleClickDynamicIcon}
            />
          )}
          {!customSelected && (
            <Switch
              onChange={value => {
                handleUpdateDsl(attrName, value)
              }}
              checked={value}
              colorScheme="techPurple"
            />
          )}
        </div>
      </div>
      {customSelected && (
        <div css={dynamicSwitchInputStyle}>
          <BaseInput
            attrName={attrName}
            value={value}
            handleUpdateDsl={handleUpdateDsl}
            panelConfig={panelConfig}
            expectedType={expectedType}
            isSetterSingleRow
            widgetDisplayName={widgetDisplayName}
            widgetType={VALIDATION_TYPES.BOOLEAN}
            widgetOrAction={widgetOrAction}
          />
        </div>
      )}
    </div>
  )
}

DynamicSwitchSetter.displayName = "DynamicSwitchSetter"
