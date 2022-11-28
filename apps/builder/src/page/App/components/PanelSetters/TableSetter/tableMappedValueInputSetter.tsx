import { FC, useMemo } from "react"
import { CodeEditor } from "@/components/CodeEditor"
import { JSToString, stringToJS } from "@/utils/evaluateDynamicString/utils"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { get } from "lodash"
import { applyInputSetterWrapperStyle } from "@/page/App/components/PanelSetters/InputSetter/style"
import { BaseInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"

function getPath(attrName?: string, widgetDisplayName?: string) {
  if (attrName && widgetDisplayName) {
    return `${widgetDisplayName}.${attrName}`
  } else {
    return widgetDisplayName
  }
}

export const realInputValue = (
  attrValue: string,
  dataPath: string,
  widgetDisplayName: string,
) => {
  if (attrValue === "" || attrValue == undefined) return ""
  const value = `${attrValue.substring(
    `{{${widgetDisplayName}.${dataPath}.map((currentRow) => ( `.length,
    attrValue.length - 4,
  )}`
  console.log("value", value)
  return JSToString(value)
}

export const getNeedComputedValue = (
  value: string,
  dataPath: string,
  widgetDisplayName: string,
) => {
  const stringToCanEvaluate = stringToJS(value)
  if (stringToCanEvaluate === "") {
    return stringToCanEvaluate
  }
  return `{{${widgetDisplayName}.${dataPath}.map((currentRow) => ( ${stringToCanEvaluate}))}}`
}

export const TableMappedValueInputSetter: FC<BaseInputSetterProps> = (
  props,
) => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    widgetDisplayName,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const isDynamic = useMemo(() => {
    const dataSourceMode = get(targetComponentProps, "dataSourceMode", "select")
    return dataSourceMode === "dynamic"
  }, [targetComponentProps])

  const dataPath = useMemo(() => {
    if (isDynamic) {
      return "dataSourceJS"
    }
    return "dataSource"
  }, [isDynamic])

  const handleValueChange = (value: string) => {
    const output = getNeedComputedValue(value, dataPath, widgetDisplayName)
    console.log(value, output, "handleValueChange")
    handleUpdateDsl(attrName, output)
  }

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
      <CodeEditor
        value={realInputValue(value, dataPath, widgetDisplayName)}
        placeholder={placeholder}
        onChange={handleValueChange}
        mode="TEXT_JS"
        expectedType={expectedType}
        path={getPath(attrName, widgetDisplayName)}
      />
    </div>
  )
}

TableMappedValueInputSetter.displayName = "TableMappedValueInputSetter"
