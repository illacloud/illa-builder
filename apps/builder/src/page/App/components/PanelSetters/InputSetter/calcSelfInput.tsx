import { FC, useCallback, useMemo } from "react"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"
import { CodeEditor } from "@/components/CodeEditor"
import { useSelector } from "react-redux"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  getNeedComputedValueWithList,
  realInputValueWithList,
} from "@/page/App/components/PanelSetters/InputSetter/util"
import { getPath } from "@/page/App/components/PanelSetters/InputSetter/baseInput"

export const CalcSelfInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    isInList,
    widgetDisplayName,
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

      handleUpdateDsl(attrName, output)
    },
    [attrName, currentListDisplayName, handleUpdateDsl],
  )

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow, isInList)}>
      <CodeEditor
        value={finalValue}
        placeholder={placeholder}
        onChange={onChange}
        mode="TEXT_JS"
        path={
          currentListDisplayName ? getPath(attrName, widgetDisplayName) : ""
        }
        expectedType={expectedType}
      />
    </div>
  )
}

CalcSelfInput.displayName = "BaseInput"
