import { hasDynamicStringSnippet } from "@illa-public/dynamic-string"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { get, isString } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import {
  getNeedComputedValueWithDataList,
  realInputValueWithDataList,
} from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import {
  applyInputSetterWrapperStyle,
  setterContainerStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/BaseInput/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ColumnMappedInputProps } from "./interface"

const ColumnMappedInput: FC<ColumnMappedInputProps> = (props) => {
  const {
    isSetterSingleRow,
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
    widgetType,
    wrappedCodeFunc,
    labelSize,
    onlyHasSetter = false,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

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

  const onFocus = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
      element: "component_inspect_code_mirror",
      parameter1: widgetType,
      parameter2: attrName,
    })
  }, [attrName, widgetType])

  const onBlur = useCallback(
    (value: string) => {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
        element: "component_inspect_code_mirror",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: value.length,
      })
    },
    [attrName, widgetType],
  )

  return (
    <div css={setterContainerStyle(isSetterSingleRow, onlyHasSetter)}>
      {!onlyHasSetter && labelName && (
        <span>
          <PanelLabel
            labelName={labelName}
            labelDesc={labelDesc}
            labelSize={labelSize}
          />
        </span>
      )}
      <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
        <CodeEditor
          scopeOfAutoComplete="page"
          value={finalValue}
          onChange={onChange}
          showLineNumbers={false}
          placeholder={placeholder}
          expectValueType={expectedType}
          lang={CODE_LANG.JAVASCRIPT}
          maxHeight="208px"
          maxWidth="100%"
          codeType={CODE_TYPE.EXPRESSION}
          modalTitle={labelName}
          modalDescription={detailedDescription ?? labelDesc}
          onFocus={onFocus}
          onBlur={onBlur}
          wrappedCodeFunc={finalWrapperCode}
        />
      </div>
    </div>
  )
}

ColumnMappedInput.displayName = "ColumnMappedInput"
export default ColumnMappedInput
