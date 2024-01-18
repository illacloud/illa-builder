import IconHotSpot from "@illa-public/icon-hot-spot"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { MinusIcon, PlusIcon, getColor } from "@illa-design/react"
import BorderIcon from "@/assets/border.svg?react"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { searchDSLByDisplayName } from "@/redux/currentApp/components/componentsSelector"
import ColorPickerSetter from "../ColorPickerSetter"
import MeasureCheckInput from "../InputSetter/MeasureCheckInput"
import { BaseInputSetterProps } from "../InputSetter/interface"
import { containerStyle, headerContainerStyle } from "./style"

const BorderSetter: FC<BaseInputSetterProps> = (props) => {
  const { handleUpdateMultiAttrDSL, widgetDisplayName } = props

  const currentWidget = searchDSLByDisplayName(widgetDisplayName)

  const borderWidth = currentWidget?.props?.borderWidth
  const borderColor = currentWidget?.props?.borderColor

  const hasBorder = !!borderWidth && !!borderColor

  const { t } = useTranslation()

  const handleClickAddBorder = () => {
    handleUpdateMultiAttrDSL?.({
      borderWidth: "1px",
      borderColor: getColor("white", "01"),
    })
  }

  const handleClickDeleteBorder = () => {
    handleUpdateMultiAttrDSL?.({
      borderWidth: undefined,
      borderColor: undefined,
    })
  }

  return (
    <div css={containerStyle}>
      <div css={headerContainerStyle}>
        <PanelLabel labelName={t("editor.inspect.setter_label.border")} />
        {hasBorder ? (
          <IconHotSpot onClick={handleClickDeleteBorder}>
            <MinusIcon />
          </IconHotSpot>
        ) : (
          <IconHotSpot onClick={handleClickAddBorder}>
            <PlusIcon />
          </IconHotSpot>
        )}
      </div>
      {hasBorder && (
        <>
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
        </>
      )}
    </div>
  )
}

export default BorderSetter
