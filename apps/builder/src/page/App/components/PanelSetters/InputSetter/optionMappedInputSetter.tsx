import { FC } from "react"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"
import { CodeEditor } from "@/components/CodeEditor"
import {
  getNeedComputedValue,
  realInputValue,
} from "@/utils/InspectHelper/selectWidgetHelper"

function getPath(attrName?: string, widgetDisplayName?: string) {
  if (attrName && widgetDisplayName) {
    return `${widgetDisplayName}.${attrName}`
  } else {
    return widgetDisplayName
  }
}

export const OptionMappedInputSetter: FC<BaseInputSetterProps> = props => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    widgetDisplayName,
  } = props

  const handleValueChange = (value: string) => {
    const output = getNeedComputedValue(value, widgetDisplayName)

    handleUpdateDsl(attrName, output)
  }

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
      <CodeEditor
        value={realInputValue(value, widgetDisplayName)}
        placeholder={placeholder}
        onChange={handleValueChange}
        mode="TEXT_JS"
        expectedType={expectedType}
        path={getPath(attrName, widgetDisplayName)}
      />
    </div>
  )
}

OptionMappedInputSetter.displayName = "OptionMappedInputSetter"
