import { FC } from "react"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterStyle, applyInputSetterWrapperStyle } from "./style"
import { CodeEditor } from "@/components/CodeEditor"
import { Input } from "@illa-design/input"

export const BaseInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    widgetDisplayName,
  } = props

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
      {/*<Input*/}
      {/*  value={value ?? ""}*/}
      {/*  placeholder={placeholder}*/}
      {/*  onChange={(value) => {*/}
      {/*    handleUpdateDsl(attrName, value)*/}
      {/*  }}*/}
      {/*/>*/}
      <CodeEditor
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        mode={"TEXT_JS"}
        expectedType={expectedType}
        path={(function getPath() {
          if (attrName && widgetDisplayName) {
            return `${widgetDisplayName}.${attrName}`
          } else {
            return widgetDisplayName
          }
        })()}
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
