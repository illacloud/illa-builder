import { FC, useContext, useEffect, useState } from "react"
import { TextArea } from "@illa-design/input"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"

export const TextAreaInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isFullWidth,
    placeholder,
    defaultValue,
    isInList,
    attrName,
    panelConfig,
    handleUpdateDsl,
    handleUpdatePanelConfig,
  } = props

  const [inputValue, setInputValue] = useState(panelConfig[attrName])

  useEffect(() => {
    setInputValue(handleUpdatePanelConfig[attrName])
  }, [panelConfig[attrName]])

  return (
    <div css={applyInputSetterWrapperStyle(isFullWidth, isInList)}>
      <TextArea
        borderColor={"techPurple"}
        placeholder={placeholder}
        value={inputValue ?? defaultValue}
        autoSize={{ maxRows: 10, minRows: 10 }}
        onChange={(value) => {
          setInputValue(value)
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}

TextAreaInput.displayName = "TextAreaInput"
