import { FC, useContext, useState } from "react"
import { DynamicSwitchProps } from "./interface"
import { Switch } from "@illa-design/switch"
import { ConfigPanelContext } from "@/page/Editor/components/InspectPanel/context"
import { PanelLabel } from "@/page/Editor/components/InspectPanel/label"
import {
  applyCustomIconStyle,
  applyLabelWrapperStyle,
  customAndSwitchWrapperCss,
  dynamicSwitchWrapperCss,
} from "./style"
import { BaseInput } from "../InputSetter/baseInput"

export const DynamicSwitchSetter: FC<DynamicSwitchProps> = (props) => {
  const { defaultValue, attrName, useCustomLabel, labelName, labelDesc } = props

  const { tempProps, handleUpdateDsl } = useContext(ConfigPanelContext)

  const customKey = `is_${attrName}_custom`
  const customValueKey = `${attrName}_custom`

  const customSelected = tempProps[customKey]
  const customValue = tempProps[customValueKey]

  return (
    <div css={applyLabelWrapperStyle(customSelected)}>
      <div css={dynamicSwitchWrapperCss}>
        {useCustomLabel && (
          <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        )}
        <div css={customAndSwitchWrapperCss}>
          <div
            css={applyCustomIconStyle(customSelected)}
            onClick={() => {
              if (customSelected) {
                handleUpdateDsl({
                  [customKey]: false,
                  [customValueKey]: "",
                })
                return
              }
              handleUpdateDsl({ [customKey]: !customSelected })
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1406 3.7814C11.1875 3.72983 11.1828 3.65171 11.1312 3.60483C11.1078 3.58452 11.0781 3.57202 11.0484 3.57202H9.91404C9.87654 3.57202 9.84217 3.58765 9.81873 3.61577L7.89842 5.88452C7.85311 5.93765 7.77498 5.9439 7.72186 5.89858C7.70779 5.88608 7.69686 5.87202 7.68904 5.85483L6.69686 3.64702C6.67654 3.60171 6.63279 3.57358 6.58279 3.57358H3.94842L3.96248 3.50015L4.08748 2.83921C4.25154 1.97358 4.68123 1.56733 5.42811 1.56733C5.71873 1.56733 5.98279 1.5939 6.19061 1.64077L6.41092 0.597021C6.05779 0.523584 5.86092 0.501709 5.55311 0.501709C3.93904 0.501709 3.10936 1.1939 2.80467 2.80327L2.65779 3.57515H1.13279C1.07342 3.57515 1.02186 3.61733 1.01092 3.67515L0.842169 4.48452C0.828107 4.55171 0.871857 4.6189 0.939045 4.63296C0.946857 4.63452 0.956232 4.63608 0.964045 4.63608H2.43748L1.04686 11.3533C1.03279 11.4205 1.07654 11.4876 1.14373 11.5017C1.15154 11.5033 1.16092 11.5048 1.16873 11.5048H2.20311C2.26248 11.5048 2.31404 11.4626 2.32498 11.4048L3.72654 4.63765H5.84842L6.91404 6.81108C6.93592 6.8564 6.92967 6.91108 6.89529 6.94858L4.07342 10.1205C4.02811 10.172 4.03279 10.2517 4.08436 10.297C4.10779 10.3173 4.13748 10.3283 4.16717 10.3283H5.30311C5.34061 10.3283 5.37498 10.3126 5.39842 10.2845L7.33123 7.99233C7.37498 7.93921 7.45467 7.93296 7.50779 7.97671C7.52186 7.98921 7.53279 8.00327 7.54061 8.02046L8.56873 10.2501C8.58904 10.2939 8.63279 10.3236 8.68279 10.3236H9.69217C9.76092 10.3236 9.81717 10.2673 9.81717 10.1986C9.81717 10.1798 9.81248 10.1611 9.80467 10.1439L8.31717 7.03608C8.29529 6.99077 8.30311 6.93608 8.33748 6.89858L11.1406 3.7814Z"
                fill="currentColor"
              />
            </svg>
          </div>
          {!customSelected && (
            <Switch
              onChange={(value) => {
                handleUpdateDsl({ [attrName]: value })
              }}
              checked={tempProps[attrName] ?? defaultValue}
              colorScheme="purple"
            />
          )}
        </div>
      </div>
      {customSelected && (
        <div style={{ marginBottom: "8px" }}>
          {/*//  TODO:run code then update dsl*/}
          {/*//  { [customValueKey]: value,[attrName]:runCode(value) }*/}
          {/*//*/}
          <BaseInput attrName={customValueKey} defaultValue={customValue} />
        </div>
      )}
    </div>
  )
}

DynamicSwitchSetter.displayName = "DynamicSwitchSetter"
