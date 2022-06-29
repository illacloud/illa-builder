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
  } = props

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
      <Input
        value={value ?? ""}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
