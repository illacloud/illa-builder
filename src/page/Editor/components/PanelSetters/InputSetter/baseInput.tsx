import { FC, useContext, useEffect, useState } from "react"
import { Input } from "@illa-design/input"
import { BaseInputSetterProps } from "./interface"
import { applyInputSetterWrapperStyle } from "./style"
import { ConfigPanelContext } from "@/page/Editor/components/InspectPanel/context"

const BaseInput: FC<BaseInputSetterProps> = (props) => {
  const { isFullWidth, placeholder, defaultValue, isInList, attrName } = props

  const { tempProps, handleUpdateDsl } = useContext(ConfigPanelContext)
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

export default BaseInput
