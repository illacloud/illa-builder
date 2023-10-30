import { FC } from "react"
import i18n from "@/i18n/config"
import OptionListSetter from "@/page/App/components/InspectPanel/PanelSetters/OptionListSetter"
import { StepsListSetterProps } from "./interface"

const StepsListSetter: FC<StepsListSetterProps> = (props) => {
  return (
    <OptionListSetter
      headerName={i18n.t("widget.step.name")}
      itemName="Step"
      {...props}
    />
  )
}

StepsListSetter.displayName = "StepsListSetter"

export default StepsListSetter
