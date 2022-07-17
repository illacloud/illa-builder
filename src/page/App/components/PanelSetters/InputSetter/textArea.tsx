import { FC, useState } from "react"
import { TextArea } from "@illa-design/input"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"

export const TextAreaInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    placeholder,
    attrName,
    panelConfig,
    handleUpdateDsl,
  } = props

  return (
    <div css={applyInputSetterWrapperStyle(isSetterSingleRow)}>
      <TextArea
        style={{ width: 240 }}
        borderColor={"techPurple"}
        placeholder={placeholder}
        value={panelConfig?.[attrName]}
        autoSize={{ maxRows: 10, minRows: 10 }}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}

TextAreaInput.displayName = "TextAreaInput"
