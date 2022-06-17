import { FC } from "react"
import { RadioGroup } from "@illa-design/radio"
import { BaseRadioGroupProps } from "./interface"
import { applySetterStyle } from "../style"

export const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = (props) => {
  const { value, options, isFullWidth, attrName, handleUpdateDsl } = props

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <RadioGroup
        onChange={(value) => {
          handleUpdateDsl({ [attrName]: value })
        }}
        value={value}
        options={options}
        type="button"
        size="small"
        colorScheme="grayBlue"
      />
    </div>
  )
}

BaseRadioGroupSetter.displayName = "BaseRadioGroupSetter"
