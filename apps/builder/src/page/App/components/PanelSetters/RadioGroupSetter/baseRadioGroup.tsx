import { FC } from "react"
import { RadioGroup } from "@illa-design/react"
import {
  applyRadioGroupWrapperStyle,
  radioGroupStyle,
} from "@/page/App/components/PanelSetters/RadioGroupSetter/style"
import { BaseRadioGroupProps } from "./interface"

export const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = (props) => {
  const { value, options, isSetterSingleRow, attrName, handleUpdateDsl } = props

  return (
    <div css={applyRadioGroupWrapperStyle(isSetterSingleRow)}>
      <RadioGroup
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        forceEqualWidth={true}
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
