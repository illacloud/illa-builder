import { FC } from "react"
import i18n from "@/i18n/config"
import OptionListSetter from "@/page/App/components/PanelSetters/OptionListSetter"
import { StepsListSetterProps } from "@/page/App/components/PanelSetters/OptionListSetter/StepsListSetter/interface"
import { emptyEmptyBodyStyle } from "@/page/App/components/PanelSetters/OptionListSetter/style"

const StepsListSetter: FC<StepsListSetterProps> = (props) => {
  return (
    <OptionListSetter
      headerName={i18n.t("widget.step.name")}
      itemName="Step"
      emptyNode={<div css={emptyEmptyBodyStyle}>No Steps</div>}
      {...props}
    />
  )
}

StepsListSetter.displayName = "StepsListSetter"

export default StepsListSetter
