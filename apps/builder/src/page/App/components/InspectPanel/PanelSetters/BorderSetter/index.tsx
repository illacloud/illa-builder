import { FC } from "react"
import { useTranslation } from "react-i18next"
// import { PlusIcon } from "@illa-design/react"
import { ReactComponent as BorderIcon } from "@/assets/border.svg"
// import IconHotSpot from "@/components/IconHotSpot"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { PanelLabel } from "../../components/Label"
import ColorPickerSetter from "../ColorPickerSetter"
import MeasureCheckInput from "../InputSetter/MeasureCheckInput"
import { BaseInputSetterProps } from "../InputSetter/interface"
import { containerStyle, headerContainerStyle } from "./style"

const BorderSetter: FC<BaseInputSetterProps> = (props) => {
  const { handleUpdateMultiAttrDSL, widgetDisplayName } = props

  const currentWidget = searchDSLByDisplayName(widgetDisplayName)

  const borderWidth = currentWidget?.props?.borderWidth
  const borderColor = currentWidget?.props?.borderColor

  const { t } = useTranslation()

  return (
    <div css={containerStyle}>
      <div css={headerContainerStyle}>
        <PanelLabel labelName={t("editor.inspect.setter_label.border")} />
        {/* <IconHotSpot>
          <PlusIcon />
        </IconHotSpot> */}
      </div>
      <ColorPickerSetter
        labelName={t("editor.inspect.setter_group.color")}
        value={borderColor}
        attrName="borderColor"
        handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
      />
      <MeasureCheckInput
        labelName={t("editor.inspect.setter_label.border_width")}
        value={borderWidth}
        attrName="borderWidth"
        handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL}
        icon={<BorderIcon />}
      />
    </div>
  )
}

export default BorderSetter
