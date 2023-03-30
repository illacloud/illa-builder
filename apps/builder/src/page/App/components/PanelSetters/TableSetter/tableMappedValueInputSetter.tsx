import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { BaseInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import { applyInputSetterWrapperStyle } from "@/page/App/components/PanelSetters/InputSetter/style"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { JSToString, stringToJS } from "@/utils/evaluateDynamicString/utils"

export const tableRealInputValue = (
  attrValue: string | undefined,
  dataPath: string,
  widgetDisplayName: string,
) => {
  if (attrValue === "" || attrValue == undefined) return ""
  const value = `${attrValue.substring(
    `{{${widgetDisplayName}.${dataPath}.map((currentRow) => ( `.length,
    attrValue.length - 4,
  )}`
  return attrValue.includes("currentRow") ? JSToString(value) : attrValue
}

export const getDataPath = (isDynamic: boolean) =>
  isDynamic ? "dataSourceJS" : "dataSource"

const getNeedComputedValue = (
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
    parentAttrName,
    handleUpdateDsl,
    expectedType,
    value,
    widgetDisplayName,
    labelDesc,
    labelName,
    detailedDescription,
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

  const dataPath = getDataPath(isDynamic)

  const handleValueChange = useCallback(
    (value: string) => {
      const output = getNeedComputedValue(value, dataPath, widgetDisplayName)

      handleUpdateDsl(attrName, output)
    },
    [attrName, dataPath, handleUpdateDsl, widgetDisplayName],
  )

  const wrappedCodeFunc = useCallback(
    (code: string) => {
      const output = getNeedComputedValue(code, dataPath, widgetDisplayName)
      return output
    },
    [dataPath, widgetDisplayName],
  )

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
      <CodeEditor
        value={tableRealInputValue(value, dataPath, widgetDisplayName)}
        onChange={handleValueChange}
        showLineNumbers={false}
        placeholder={placeholder}
        expectValueType={expectedType}
        lang={CODE_LANG.JAVASCRIPT}
        maxHeight="208px"
        minHeight="30px"
        maxWidth="100%"
        codeType={CODE_TYPE.EXPRESSION}
        wrappedCodeFunc={wrappedCodeFunc}
        modalTitle={labelName}
        modalDescription={detailedDescription || labelDesc}
      />
    </div>
  )
}

TableMappedValueInputSetter.displayName = "TableMappedValueInputSetter"
