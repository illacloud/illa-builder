import { get, toPath } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { BaseInputSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/interface"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { JSToString, stringToJS } from "@/utils/evaluateDynamicString/utils"
import BaseInput from "../InputSetter/BaseInput"

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

const TableMappedValueInputSetter: FC<BaseInputSetterProps> = (props) => {
  const { parentAttrName, handleUpdateDsl, value, widgetDisplayName } = props

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

  const fromCurrentRow = useMemo(() => {
    return get(
      targetComponentProps,
      `${parentAttrName}.fromCurrentRow`,
      {},
    ) as Record<string, boolean>
  }, [targetComponentProps, parentAttrName])

  const dataPath = useMemo(() => {
    if (isDynamic) {
      return "dataSourceJS"
    }
    return "dataSource"
  }, [isDynamic])

  const handleValueChange = useCallback(
    (attrName: string, value: string) => {
      const isFromCurrentRow = value.includes("currentRow")
      const output = isFromCurrentRow
        ? getNeedComputedValue(value, dataPath, widgetDisplayName)
        : value
      const paths = toPath(attrName)
      const name = paths.at(-1) as string
      handleUpdateDsl(attrName, output)
      handleUpdateDsl(`${parentAttrName}.fromCurrentRow`, {
        ...fromCurrentRow,
        [name]: isFromCurrentRow,
      })
    },
    [
      dataPath,
      fromCurrentRow,
      handleUpdateDsl,
      parentAttrName,
      widgetDisplayName,
    ],
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
export default TableMappedValueInputSetter
