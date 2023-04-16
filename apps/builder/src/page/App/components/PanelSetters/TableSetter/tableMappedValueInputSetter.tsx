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

function getPath(attrName?: string, widgetDisplayName?: string) {
  if (attrName && widgetDisplayName) {
    return `${widgetDisplayName}.${attrName}`
  } else {
    return widgetDisplayName
  }
}

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
    (value: string) => {
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
      attrName,
      dataPath,
      handleUpdateDsl,
      parentAttrName,
      widgetDisplayName,
      fromCurrentRow,
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
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
      <CodeEditor
        value={realInputValue(value, dataPath, widgetDisplayName)}
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
