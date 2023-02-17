import { get } from "lodash"
import { FC, useCallback } from "react"
import { Switch } from "@illa-design/react"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { DynamicIcon } from "@/page/App/components/PanelSetters/PublicComponent/DynamicIcon"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { BaseInput } from "../InputSetter/baseInput"
import { DynamicSwitchProps } from "./interface"
import {
  applyLabelWrapperStyle,
  customAndSwitchWrapperStyle,
  dynamicSwitchInputStyle,
  dynamicSwitchWrapperStyle,
} from "./style"

export const DynamicSwitchSetter: FC<DynamicSwitchProps> = (props) => {
  const {
    attrName,
    labelName,
    labelDesc,
    panelConfig,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
    value,
    widgetDisplayName,
    expectedType,
    widgetOrAction,
    openDynamic,
  } = props

  const customSelected = get(panelConfig, `${attrName}Dynamic`, false)

  const handleClickDynamicIcon = useCallback(() => {
    if (customSelected) {
      handleUpdateMultiAttrDSL?.({
        [attrName]: undefined,
        [`${attrName}Dynamic`]: false,
      })
    } else {
      handleUpdateMultiAttrDSL?.({
        [attrName]: undefined,
        [`${attrName}Dynamic`]: true,
      })
    }
  }, [attrName, customSelected, handleUpdateMultiAttrDSL])

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
              checked={value as boolean}
              colorScheme="techPurple"
            />
          )}
        </div>
      </div>
      {customSelected && (
        <div css={dynamicSwitchInputStyle}>
          <BaseInput
            attrName={attrName}
            value={value as string}
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
