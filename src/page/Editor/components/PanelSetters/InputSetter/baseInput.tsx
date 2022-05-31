import { FC, useEffect, useState } from "react"
import { Input } from "@illa-design/input"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"
import { getDynamicValue } from "@/utils/parserExpressionStatement"

export const BaseInput: FC<BaseInputSetterProps> = (props) => {
  const {
    isFullWidth,
    placeholder,
    defaultValue,
    isInList,
    attrName,
    panelConfig,
    handleUpdateDsl,
    handleUpdateConfigPanel,
  } = props

  const [inputValue, setInputValue] = useState(panelConfig[attrName])

  useEffect(() => {
    setInputValue(panelConfig[attrName])
  }, [panelConfig[attrName]])

  return (
    <div css={applyInputSetterWrapperStyle(isFullWidth, isInList)}>
      <Input
        placeholder={placeholder}
        value={inputValue ?? defaultValue}
        onChange={(value) => {
          setInputValue(value)
          handleUpdateConfigPanel({ [attrName]: value })
          // TODO： calc dsl and then to update props
          const res = getDynamicValue(value)
          handleUpdateDsl({ [attrName]: res })
        }}
      />
    </div>
  )
}

BaseInput.displayName = "BaseInput"
