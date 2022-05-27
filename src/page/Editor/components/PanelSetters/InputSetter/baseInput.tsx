import { FC, useEffect, useState } from "react"
import { Input } from "@illa-design/input"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"

export const BaseInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isFullWidth,
    placeholder,
    defaultValue,
    isInList,
    attrName,
    tempProps,
    handleUpdateDsl,
  } = props

  const [inputValue, setInputValue] = useState(tempProps[attrName])

  useEffect(() => {
    setInputValue(tempProps[attrName])
  }, [tempProps[attrName]])

  return (
    <div css={applyInputSetterWrapperStyle(isFullWidth, isInList)}>
      <Input
        placeholder={placeholder}
        value={inputValue ?? defaultValue}
        onChange={(value) => {
          setInputValue(value)
          handleUpdateDsl({ [attrName]: value })
        }}
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
