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
    labelSize = "small",
  } = props

  const handleUpdateBorderColor = (currentColor: string) => {
    handleUpdateMultiAttrDSL?.({
      [attrName]: currentColor,
    })
  }

  return (
    <div css={setterContainerStyle}>
      <PanelLabel
        labelName={labelName}
        labelDesc={labelDesc}
        labelSize={labelSize}
      />
      <ColorSetter
        handleUpdateColor={handleUpdateBorderColor}
        value={value}
        setterSize={labelSize}
      />
    </div>
  )
}

export default ColorPickerSetter
