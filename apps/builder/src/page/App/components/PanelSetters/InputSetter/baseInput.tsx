import { FC, useMemo } from "react"
import { CodeEditor } from "@/components/CodeEditor"
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
    expectedType,
    value,
    widgetDisplayName,
    isInList,
  } = props

  const _value = useMemo(() => {
    if (typeof value === "object") {
      return `{{${JSON.stringify(value)}}}`
    } else {
      return value
    }
  }, [value])

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow, isInList)}>
      <CodeEditor
        value={_value ?? ""}
        placeholder={placeholder}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        mode="TEXT_JS"
        expectedType={expectedType}
        path={getPath(attrName, widgetDisplayName)}
        maxHeight="208px"
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
