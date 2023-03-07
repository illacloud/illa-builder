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
} from "@/page/App/components/PanelSetters/InputSetter/util"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"

export function getPath(attrName?: string, widgetDisplayName?: string) {
  if (attrName && widgetDisplayName) {
    return `${widgetDisplayName}.${attrName}`
  } else {
    return widgetDisplayName as string
  }
}

export const BaseInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    handleUpdateDsl,
    handleUpdateMultiAttrDSL,
    expectedType,
    value,
    widgetDisplayName,
    isInList,
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

  const finalValue = useMemo(() => {
    if (currentListDisplayName) {
      return realInputValueWithList(value, currentListDisplayName)
    }
    return value || ""
  }, [currentListDisplayName, value])

  const onChange = useCallback(
    (value: string) => {
      let output = value
      if (currentListDisplayName) {
        output = getNeedComputedValueWithList(value, currentListDisplayName)
      }

      handleUpdateMultiAttrDSL?.({
        [attrName]: output,
      })
    },
    [attrName, currentListDisplayName, handleUpdateMultiAttrDSL],
  )
  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow, isInList)}>
      <CodeEditor
        value={finalValue}
        onChange={onChange}
        showLineNumbers={false}
        placeholder={placeholder}
        expectValueType={expectedType}
        lang={CODE_LANG.JAVASCRIPT}
        maxHeight="208px"
        maxWidth="100%"
        codeType={CODE_TYPE.EXPRESSION}
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
