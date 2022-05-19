import { FC, useContext } from "react"
import { RadioGroup } from "@illa-design/radio"
import { BaseRadioGroupProps } from "./interface"
import { ConfigPanelContext } from "@/page/Editor/components/InspectPanel/context"
import { applySetterStyle } from "../style"

const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = (props) => {
  const { defaultValue, options, isFullWidth, attrName } = props

  const { tempProps, handleUpdateDsl } = useContext(ConfigPanelContext)

  return (
    <div css={applySetterStyle(isFullWidth)}>
      <RadioGroup
        onChange={(value) => handleUpdateDsl({ [attrName]: value })}
        value={tempProps[attrName] ?? defaultValue}
        options={options}
        type="button"
        size="small"
      />
    </div>
  )
}

export default BaseRadioGroupSetter
