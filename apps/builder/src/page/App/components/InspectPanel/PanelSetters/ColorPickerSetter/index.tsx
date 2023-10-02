import { FC } from "react"
import ColorSetter from "@/components/ColorSetter"
import { PanelLabel } from "../../components/Label"
import { ColorPickerSetterProps } from "./interface"
import { setterContainerStyle } from "./style"

const ColorPickerSetter: FC<ColorPickerSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    handleUpdateMultiAttrDSL,
    value,
    attrName,
    size = "small",
  } = props

  const handleUpdateBorderColor = (currentColor: string) => {
    handleUpdateMultiAttrDSL?.({
      [attrName]: currentColor,
    })
  }

  return (
    <div css={setterContainerStyle}>
      <PanelLabel labelName={labelName} labelDesc={labelDesc} size={size} />
      <ColorSetter handleUpdateColor={handleUpdateBorderColor} value={value} />
    </div>
  )
}

export default ColorPickerSetter
