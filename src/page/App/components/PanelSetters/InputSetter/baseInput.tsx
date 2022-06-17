import { FC, useEffect, useState } from "react"
import { Input } from "@illa-design/input"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterStyle, applyInputSetterWrapperStyle } from "./style"
import { CodeEditor } from "@/components/CodeEditor"

export const BaseInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isFullWidth,
    placeholder,
    defaultValue,
    isInList,
    attrName,
    panelConfig,
    handleUpdateDsl,
    expectedType,
    value,
  } = props

  return (
    <div css={applyInputSetterWrapperStyle(isFullWidth, isInList)}>
      <CodeEditor
        css={applyInputSetterStyle}
        placeholder={placeholder ?? ""}
        value={value ?? ""}
        expectedType={expectedType || "String"}
        mode="TEXT_JS"
        onChange={(value, calcResult) => {
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
