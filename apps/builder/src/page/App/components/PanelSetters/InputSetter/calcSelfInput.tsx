import { FC } from "react"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"
import { CodeEditor } from "@/components/CodeEditor"

export const CalcSelfInput: FC<BaseInputSetterProps> = props => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    isInList,
  } = props

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow, isInList)}>
      <CodeEditor
        value={value ?? ""}
        placeholder={placeholder}
        onChange={value => {
          handleUpdateDsl(attrName, value)
        }}
        mode="TEXT_JS"
        expectedType={expectedType}
      />
    </div>
  )
}

CalcSelfInput.displayName = "BaseInput"
