import { BaseInput } from "../InputSetter/baseInput"
import { DynamicSwitchProps } from "./interface"
import {
  applyLabelWrapperStyle,
  customAndSwitchWrapperStyle,
  dynamicSwitchInputStyle,
  dynamicSwitchWrapperStyle,
} from "./style"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { DynamicIcon } from "@/page/App/components/PanelSetters/PublicComponent/DynamicIcon"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Switch } from "@illa-design/react"
import { get } from "lodash"
import { FC, useCallback } from "react"

export const DynamicSwitchSetter: FC<DynamicSwitchProps> = (props) => {
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
              onChange={(value) => {
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
