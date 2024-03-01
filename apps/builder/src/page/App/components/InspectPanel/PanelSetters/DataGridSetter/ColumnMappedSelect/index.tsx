import { hasDynamicStringSnippet } from "@illa-public/dynamic-string"
import { get, isString } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import {
  getNeedComputedValueWithDataList,
  realInputValueWithDataList,
} from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { DynamicIcon } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/DynamicIcon"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import {
  getExecutionError,
  getExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { ColumnMappedSelectProps } from "./interface"
import {
  basicDynamicSetterContainerStyle,
  dynamicSelectHeaderStyle,
  dynamicSelectSetterStyle,
} from "./style"

const ColumnMappedSelect: FC<ColumnMappedSelectProps> = (props) => {
  const {
    placeholder,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    widgetDisplayName,
    labelName,
    detailedDescription,
    defaultValue,
    labelDesc,
    options,
    wrappedCodeFunc,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const isDynamic =
    get(
      targetComponentProps,
      `${widgetDisplayName}.${attrName}JS`,
      "select",
    ) === "dynamic"

  const executionErrors = useSelector(getExecutionError)
  const isError = useMemo(() => {
    return (
      (executionErrors[`${widgetDisplayName}.${attrName}JS`] ?? [])?.length > 0
    )
  }, [attrName, executionErrors, widgetDisplayName])

  const handleClickFxButton = useCallback(() => {
    if (isDynamic) {
      handleUpdateDsl(`${widgetDisplayName}.${attrName}JS`, "select")
      handleUpdateDsl(attrName, undefined)
    } else {
      handleUpdateDsl(`${widgetDisplayName}.${attrName}JS`, "dynamic")
    }
  }, [attrName, handleUpdateDsl, isDynamic, widgetDisplayName])

  const dataSourceMode = get(targetComponentProps, "dataSourceMode", "dynamic")

  const finalWrapperCode = useMemo(() => {
    if (
      hasDynamicStringSnippet(value ?? "") &&
      isString(value) &&
      value?.includes("currentRow")
    ) {
      return (value: string) => {
        return getNeedComputedValueWithDataList(
          value,
          widgetDisplayName,
          dataSourceMode,
        )
      }
    }
    return wrappedCodeFunc
  }, [value, wrappedCodeFunc, widgetDisplayName, dataSourceMode])

  const finalValue = useMemo(() => {
    const v = value ?? defaultValue

    if (widgetDisplayName && isString(v) && v.includes("currentRow")) {
      return realInputValueWithDataList(
        value ?? defaultValue,
        widgetDisplayName,
      )
    }

    if (value === undefined && defaultValue === undefined) {
      return undefined
    }
    if (!isString(value ?? defaultValue)) {
      return `{{ ${value ?? defaultValue} }}`
    }
    return value ?? defaultValue
  }, [widgetDisplayName, value, defaultValue])

  const onChange = useCallback(
    (value: string) => {
      let output = value
      if (
        hasDynamicStringSnippet(value ?? "") &&
        value.includes("currentRow")
      ) {
        output = getNeedComputedValueWithDataList(
          value,
          widgetDisplayName,
          dataSourceMode,
        )
        handleUpdateDsl(attrName, output)
      } else {
        if (output === "") {
          handleUpdateDsl(attrName, undefined)
        } else {
          handleUpdateDsl(attrName, output)
        }
      }
    },
    [attrName, dataSourceMode, handleUpdateDsl, widgetDisplayName],
  )

  return (
    <div css={basicDynamicSetterContainerStyle}>
      <div css={dynamicSelectHeaderStyle}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <DynamicIcon
          isDynamic={isDynamic}
          onClick={handleClickFxButton}
          hasRightContent={false}
        />
      </div>
      <div css={dynamicSelectSetterStyle}>
        {isDynamic ? (
          <CodeEditor
            value={finalValue ?? ""}
            onChange={onChange}
            showLineNumbers={false}
            placeholder={placeholder}
            expectValueType={expectedType}
            lang={CODE_LANG.JAVASCRIPT}
            maxHeight="208px"
            minHeight="30px"
            maxWidth="100%"
            codeType={CODE_TYPE.EXPRESSION}
            modalTitle={labelName}
            modalDescription={labelDesc ?? detailedDescription}
            scopeOfAutoComplete="page"
            wrappedCodeFunc={finalWrapperCode}
          />
        ) : (
          <Select
            colorScheme="techPurple"
            placeholder={placeholder}
            options={options}
            value={finalValue}
            onChange={(v) => handleUpdateDsl?.(attrName, v)}
            showSearch
            allowClear
            error={isError}
          />
        )}
      </div>
    </div>
  )
}

ColumnMappedSelect.displayName = "ColumnMappedSelect"
export default ColumnMappedSelect
