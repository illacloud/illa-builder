import { FC } from "react"
import { RadioGroup } from "@illa-design/radio"
import { BaseRadioGroupProps } from "./interface"
import { applySetterStyle } from "../style"

export const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = (props) => {
  const {
    defaultValue,
    options,
    isFullWidth,
    attrName,
    panelConfig,
    handleUpdateDsl,
  } = props

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <RadioGroup
        onChange={(value) => handleUpdateDsl({ [attrName]: value })}
        value={panelConfig[attrName] ?? defaultValue}
        options={options}
        type="button"
        size="small"
        colorScheme="grayBlue"
      />
    </div>
  )
}

BaseRadioGroupSetter.displayName = "BaseRadioGroupSetter"
