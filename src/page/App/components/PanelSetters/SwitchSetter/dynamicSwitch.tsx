import { FC } from "react"
import { get } from "lodash"
import { FxIcon } from "@illa-design/icon"
import { Switch } from "@illa-design/switch"
import { DynamicSwitchProps } from "./interface"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import {
  applyCustomIconStyle,
  applyLabelWrapperStyle,
  customAndSwitchWrapperStyle,
  dynamicSwitchWrapperStyle,
} from "./style"
import { BaseInput } from "../InputSetter/baseInput"

export const DynamicSwitchSetter: FC<DynamicSwitchProps> = (props) => {
  const {
    attrName,
    labelName,
    labelDesc,
    panelConfig,
    handleUpdateDsl,
    value,
  } = props

  const dynamicAttrPath = get(panelConfig, "$dynamicAttrPaths", [])

  const customSelected = dynamicAttrPath.includes(attrName)

  return (
    <div css={applyLabelWrapperStyle(customSelected)}>
      <div css={dynamicSwitchWrapperStyle}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <div css={customAndSwitchWrapperStyle}>
          <div
            css={applyCustomIconStyle(customSelected)}
            onClick={() => {
              if (customSelected) {
                handleUpdateDsl(attrName, false)
              } else {
                handleUpdateDsl(attrName, "{{}}")
              }
            }}
          >
            <FxIcon />
          </div>
          {!customSelected && (
            <Switch
              onChange={(value) => {
                handleUpdateDsl(attrName, value)
              }}
              checked={value}
              colorScheme="purple"
            />
          )}
        </div>
      </div>
      {customSelected && (
        <div style={{ marginBottom: "8px" }}>
          <BaseInput
            attrName={attrName}
            value={value}
            handleUpdateDsl={handleUpdateDsl}
            panelConfig={panelConfig}
            expectedType="String"
            isSetterSingleRow
          />
        </div>
      )}
    </div>
  )
}

DynamicSwitchSetter.displayName = "DynamicSwitchSetter"
