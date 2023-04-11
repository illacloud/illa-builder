import { get, toPath } from "lodash"
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
import { BaseInput } from "../InputSetter/baseInput"

const realInputValue = (
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

  const dataPath = useMemo(() => {
    if (isDynamic) {
      return "dataSourceJS"
    }
    return "dataSource"
  }, [isDynamic])

  const handleValueChange = useCallback(
    (attrName: string, value: string) => {
      const fromCurrentRow = value.includes("currentRow")
      const output = fromCurrentRow
        ? getNeedComputedValue(value, dataPath, widgetDisplayName)
        : value
      const paths = toPath(attrName)
      const name = paths.at(-1) as string
      handleUpdateDsl(attrName, output)
      handleUpdateDsl(`${parentAttrName}.fromCurrentRow`, {
        [name]: fromCurrentRow,
      })
    },
    [dataPath, handleUpdateDsl, parentAttrName, widgetDisplayName],
  )

  const wrappedCodeFunc = useCallback(
    (code: string) => {
      const fromCurrentRow = code.includes("currentRow")
      const output = fromCurrentRow
        ? getNeedComputedValue(code, dataPath, widgetDisplayName)
        : code
      return output
    },
    [dataPath, widgetDisplayName],
  )

  return (
    <BaseInput
      {...props}
      value={realInputValue(value, dataPath, widgetDisplayName)}
      wrappedCodeFunc={wrappedCodeFunc}
      handleUpdateDsl={handleValueChange}
    />
  )
}

TableMappedValueInputSetter.displayName = "TableMappedValueInputSetter"
