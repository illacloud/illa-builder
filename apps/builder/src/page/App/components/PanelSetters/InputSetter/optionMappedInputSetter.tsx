import { FC, useCallback } from "react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import {
  getNeedComputedValue,
  realInputValue,
} from "@/utils/InspectHelper/selectWidgetHelper"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"

function getPath(attrName?: string, widgetDisplayName?: string) {
  if (attrName && widgetDisplayName) {
    return `${widgetDisplayName}.${attrName}`
  } else {
    return widgetDisplayName
  }
}

export const OptionMappedInputSetter: FC<BaseInputSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    widgetDisplayName,
    isInList,
  } = props

  const handleValueChange = useCallback(
    (value: string) => {
      const output = getNeedComputedValue(value, widgetDisplayName)

      handleUpdateDsl(attrName, output)
    },
    [attrName, handleUpdateDsl, widgetDisplayName],
  )

  const wrappedCodeFunc = useCallback(
    (value: string) => {
      return getNeedComputedValue(value, widgetDisplayName)
    },
    [widgetDisplayName],
  )

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow, isInList)}>
      <CodeEditor
        value={realInputValue(value, widgetDisplayName)}
        onChange={handleValueChange}
        showLineNumbers={false}
        placeholder={placeholder}
        expectValueType={expectedType}
        lang={CODE_LANG.JAVASCRIPT}
        maxHeight="208px"
        maxWidth="100%"
        codeType={CODE_TYPE.EXPRESSION}
        wrappedCodeFunc={wrappedCodeFunc}
      />
    </div>
  )
}

OptionMappedInputSetter.displayName = "OptionMappedInputSetter"
