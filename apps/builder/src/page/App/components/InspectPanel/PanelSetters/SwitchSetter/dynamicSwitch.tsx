import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { get } from "lodash-es"
import { FC, useCallback } from "react"
import { Switch } from "@illa-design/react"
import { DynamicIcon } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/DynamicIcon"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { trackInEditor } from "@/utils/mixpanelHelper"
import BaseInput from "../InputSetter/BaseInput"
import { DynamicSwitchProps } from "./interface"
import {
  applyLabelWrapperStyle,
  customAndSwitchWrapperStyle,
  dynamicSwitchWrapperStyle,
} from "./style"

const DynamicSwitchSetter: FC<DynamicSwitchProps> = (props) => {
  const {
    attrName,
    labelName,
    labelDesc,
    handleUpdateDsl,
    defaultValue,
    handleUpdateMultiAttrDSL,
    value,
    openDynamic,
    detailedDescription,
    widgetType,
    componentNode,
  } = props

  const customSelected = get(componentNode, `props.${attrName}Dynamic`, false)

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
        {labelName && (
          <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        )}
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
              defaultValue={defaultValue}
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
        <BaseInput
          {...props}
          value={value as string}
          isSetterSingleRow
          detailedDescription={detailedDescription ?? labelDesc}
          onlyHasSetter={true}
        />
      )}
    </div>
  )
}

DynamicSwitchSetter.displayName = "DynamicSwitchSetter"

export default DynamicSwitchSetter
