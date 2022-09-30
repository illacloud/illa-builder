import { FC } from "react"
import { RadioGroup } from "@illa-design/radio"
import { BaseRadioGroupProps } from "./interface"
import {
  applyRadioGroupWrapperStyle,
  radioGroupStyle,
} from "@/page/App/components/PanelSetters/RadioGroupSetter/style"

export const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = props => {
  const { value, options, isSetterSingleRow, attrName, handleUpdateDsl } = props

  return (
    <div css={applyRadioGroupWrapperStyle(isSetterSingleRow)}>
      <RadioGroup
        onChange={value => {
          handleUpdateDsl(attrName, value)
        }}
        value={value}
        options={options}
        type="button"
        size="small"
        colorScheme="grayBlue"
        css={radioGroupStyle}
      />
    </div>
  )
}

BaseRadioGroupSetter.displayName = "BaseRadioGroupSetter"
