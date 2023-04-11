import { get } from "lodash"
import { FC, useCallback } from "react"
import { Switch } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { DynamicIcon } from "@/page/App/components/PanelSetters/PublicComponent/DynamicIcon"
import { trackInEditor } from "@/utils/mixpanelHelper"
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
    detailedDescription,
    widgetType,
  } = props

  const customSelected = get(panelConfig, `${attrName}Dynamic`, false)

  const handleClickDynamicIcon = useCallback(() => {
    if (customSelected) {
      handleUpdateMultiAttrDSL?.({
        [attrName]: undefined,
        [`${attrName}Dynamic`]: false,
      })
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "fx",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: "off",
      })
    } else {
      handleUpdateMultiAttrDSL?.({
        [attrName]: undefined,
        [`${attrName}Dynamic`]: true,
      })
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "fx",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: "on",
      })
    }
  }, [attrName, customSelected, handleUpdateMultiAttrDSL, widgetType])

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
                trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                  element: "component_inspect_radio",
                  parameter1: widgetType,
                  parameter2: attrName,
                })
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
            widgetType={widgetType}
            widgetOrAction={widgetOrAction}
            labelName={labelName}
            detailedDescription={detailedDescription ?? labelDesc}
          />
        </div>
      )}
    </div>
  )
}

DynamicSwitchSetter.displayName = "DynamicSwitchSetter"
