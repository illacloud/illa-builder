import { FC, useContext, useEffect, useMemo } from "react"
import { DynamicSelectSetterProps } from "./interface"

import {
  dynamicSelectHeaderStyle,
  dynamicSelectStyle,
  useTypeTextStyle,
} from "./style"
import { Select } from "@illa-design/select"
import { applyInputSetterWrapperStyle } from "@/page/App/components/PanelSetters/InputSetter/style"
import { CodeEditor } from "@/components/CodeEditor"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { get } from "lodash"

export const INPUT_MODE_SUFFIX = "InputMode"
export const OPTIONS_SUFFIX = "Options"
export const DROP_DOWN_VALUE_SUFFIX = "Dropdown"
export const JS_VALUE_SUFFIX = "js"

export const INPUT_MODE = {
  JAVASCRIPT: "javascript",
  USE_DROP: "useDrop",
}

function getPath(attrName?: string, widgetDisplayName?: string) {
  if (attrName && widgetDisplayName) {
    return `${widgetDisplayName}.${attrName}`
  } else {
    return widgetDisplayName
  }
}

export const DynamicSelectSetter: FC<DynamicSelectSetterProps> = (props) => {
  const {
    options,
    attrName,
    handleUpdateDsl,
    panelConfig,
    labelName,
    isSetterSingleRow,
    widgetDisplayName,
    expectedType,
  } = props

  const isUseJsKey = attrName + INPUT_MODE_SUFFIX
  const dropDownOption = attrName + OPTIONS_SUFFIX

  // init inputMode
  useEffect(() => {
    handleUpdateDsl(isUseJsKey, INPUT_MODE.USE_DROP)
  }, [])

  const _options = useMemo(() => {
    return options ?? panelConfig?.[dropDownOption]
  }, [options, panelConfig?.[dropDownOption]])

  const isUseJs = useMemo(() => {
    return panelConfig?.[isUseJsKey] === INPUT_MODE.JAVASCRIPT
  }, [panelConfig?.[isUseJsKey]])

  const dropDownValue = attrName + DROP_DOWN_VALUE_SUFFIX
  const jsValue = attrName + JS_VALUE_SUFFIX

  return (
    <div css={dynamicSelectStyle}>
      <div css={dynamicSelectHeaderStyle}>
        <PanelLabel labelName={labelName} />
        <span
          css={useTypeTextStyle}
          onClick={() => {
            handleUpdateDsl(
              isUseJsKey,
              isUseJs ? INPUT_MODE.USE_DROP : INPUT_MODE.JAVASCRIPT,
            )
          }}
        >
          {isUseJs ? "Use JavaScript" : "Use DropDown"}
        </span>
      </div>
      <div>
        {isUseJs ? (
          <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
            <CodeEditor
              onChange={(value) => {
                handleUpdateDsl(jsValue, value)
              }}
              path={getPath(attrName, widgetDisplayName)}
              mode={"TEXT_JS"}
              expectedType={expectedType}
            />
          </div>
        ) : (
          <Select
            allowClear
            options={_options}
            size="small"
            onChange={(value) => {
              handleUpdateDsl(dropDownValue, value)
            }}
          />
        )}
      </div>
    </div>
  )
}

DynamicSelectSetter.displayName = "BaseSelectSetter"
