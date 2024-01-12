import { hasDynamicStringSnippet } from "@illa-public/dynamic-string"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { isString } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import {
  getNeedComputedValueWithList,
  realInputValueWithList,
} from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/util"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/components/componentsSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { NewBaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle, setterContainerStyle } from "./style"

const BaseInput: FC<NewBaseInputSetterProps> = (props) => {
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

  const listWidgets = useSelector(
    getContainerListDisplayNameMappedChildrenNodeDisplayName,
  )

  const currentListDisplayName = useMemo(() => {
    const listWidgetDisplayNames = Object.keys(listWidgets)
    for (let i = 0; i < listWidgetDisplayNames.length; i++) {
      if (listWidgets[listWidgetDisplayNames[i]].includes(widgetDisplayName)) {
        return listWidgetDisplayNames[i]
      }
    }
    return ""
  }, [listWidgets, widgetDisplayName])

  const finalWrapperCode = useMemo(() => {
    if (
      currentListDisplayName &&
      hasDynamicStringSnippet(value ?? "") &&
      value?.includes("currentItem")
    ) {
      return (value: string) => {
        return getNeedComputedValueWithList(value, currentListDisplayName)
      }
    }
    return wrappedCodeFunc
  }, [currentListDisplayName, value, wrappedCodeFunc])

  const finalValue = useMemo(() => {
    if (currentListDisplayName) {
      return realInputValueWithList(
        value ?? defaultValue,
        currentListDisplayName,
      )
    }

    if (value === undefined && defaultValue === undefined) {
      return undefined
    }

    if (!isString(value ?? defaultValue)) {
      return `{{ ${value ?? defaultValue} }}`
    }
    return value ?? defaultValue
  }, [currentListDisplayName, defaultValue, value])

  const onChange = useCallback(
    (value: string) => {
      let output = value
      if (
        currentListDisplayName &&
        hasDynamicStringSnippet(value ?? "") &&
        value.includes("currentItem")
      ) {
        output = getNeedComputedValueWithList(value, currentListDisplayName)
      }
      handleUpdateDsl(attrName, output)
    },
    [attrName, currentListDisplayName, handleUpdateDsl],
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
          expectValueType={currentListDisplayName ? undefined : expectedType}
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

BaseInput.displayName = "BaseInput"
export default BaseInput
