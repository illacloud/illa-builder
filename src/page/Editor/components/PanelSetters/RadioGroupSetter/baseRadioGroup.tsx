import { FC, useContext } from "react"
import { applyBaseRadioGroupStyle } from "./style"
import { RadioGroup } from "@illa-design/radio"
import { BaseRadioGroupProps } from "./interface"
import { ConfigPanelContext } from "../../InspectPanel/context"

const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = (props) => {
  const { defaultValue, options, isFullWidth, attrName } = props

  const { componentDsl, tempProps, handleUpdateDsl } =
    useContext(ConfigPanelContext)

  return (
    <div css={applyBaseRadioGroupStyle(isFullWidth)}>
      <RadioGroup
        onChange={(value) => handleUpdateDsl({ [attrName]: value })}
        value={tempProps[attrName]}
        defaultValue={defaultValue}
        options={options}
        type="button"
        size="small"
      />
    </div>
  )
}

export default BaseRadioGroupSetter
