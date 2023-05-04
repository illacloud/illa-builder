import { FC } from "react"
import { OptionListSetter } from "@/page/App/components/PanelSetters/OptionListSetter"
import { OptionListSetterProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { emptyEmptyBodyStyle } from "@/page/App/components/PanelSetters/OptionListSetter/style"

export const SwitchGroupListSetter: FC<OptionListSetterProps> = (props) => {
  return (
    <OptionListSetter
      itemName="Option"
      emptyNode={<div css={emptyEmptyBodyStyle}>No Option</div>}
      showDuplicationKeyError={true}
      {...props}
    />
  )
}

SwitchGroupListSetter.displayName = "SwitchGroupListSetter"
