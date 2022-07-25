import { FC, useMemo } from "react"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES_TRANS } from "@/utils/validationFactory"

function getPath(attrName?: string, widgetDisplayName?: string) {
  if (attrName && widgetDisplayName) {
    return `${widgetDisplayName}.${attrName}`
  } else {
    return widgetDisplayName
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
        mode={"TEXT_JS"}
        expectedType={VALIDATION_TYPES_TRANS[expectedType]}
        path={getPath(attrName, widgetDisplayName)}
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
