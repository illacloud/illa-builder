import { FC, useContext, useMemo } from "react"
import { DynamicSwitchProps } from "./interface"

import { PanelLabel } from "@/page/Editor/components/InspectPanel/label"
import { BaseInput } from "@/page/Editor/components/PanelSetters/InputSetter/baseInput"
import { BaseSelect } from "@/page/Editor/components/PanelSetters/SelectSetter/baseSelect"
import {
  dynamicSelectHeaderStyle,
  dynamicSelectStyle,
  useTypeTextStyle,
} from "@/page/Editor/components/PanelSetters/SelectSetter/style"

export const DynamicSelectSetter: FC<DynamicSwitchProps> = (props) => {
  const {
    options,
    attrName,
    handleUpdateDsl,
    handleUpdatePanelConfig,
    panelConfig,
    useCustomLabel,
    labelName,
    isFullWidth,
    labelDesc,
    allowClear,
  } = props

  const isUseJsKey = `${attrName}_isUseJsKey`
  const isUseJs = panelConfig[isUseJsKey]
  const customValueKey = `${attrName}_custom`
  const customValue = panelConfig[customValueKey]
  const _options = useMemo(() => {
    return options ?? panelConfig[`${attrName}_custom_options`]
  }, [options, panelConfig[`${attrName}_custom_options`]])

  return (
    <div css={dynamicSelectStyle}>
      <div css={dynamicSelectHeaderStyle}>
        {useCustomLabel && (
          <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        )}
        <span
          onClick={() => {
            handleUpdatePanelConfig({ [isUseJsKey]: !isUseJs })
          }}
          css={useTypeTextStyle}
        >
          {isUseJsKey ? "Use JavaScript" : "Use DropDown"}
        </span>
      </div>
      <div>
        {isUseJs ? (
          <BaseInput
            isFullWidth
            attrName={customValueKey}
            defaultValue={customValue}
            panelConfig={panelConfig}
            handleUpdatePanelConfig={handleUpdatePanelConfig}
            handleUpdateDsl={handleUpdateDsl}
          />
        ) : (
          <BaseSelect
            allowClear={allowClear}
            isFullWidth={isFullWidth}
            options={_options}
            attrName={attrName}
            panelConfig={panelConfig}
            handleUpdatePanelConfig={handleUpdatePanelConfig}
            handleUpdateDsl={handleUpdateDsl}
          />
        )}
      </div>
    </div>
  )
}

DynamicSelectSetter.displayName = "BaseSelectSetter"
