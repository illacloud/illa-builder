import Sketch from "@uiw/react-color-sketch"
import { FC } from "react"
import { getColor } from "@illa-design/react"
import { COLOR_MAP, PRE_COLOR, colorSchemes } from "./constants"
import { ColorPickerProps } from "./interface"

export const ColorPicker: FC<ColorPickerProps> = (props) => {
  const { onChange, selectedColor, disableAlpha } = props

  let c = selectedColor
  if (colorSchemes.includes(selectedColor)) {
    c = getColor(selectedColor, "03")
  }

  return (
    <Sketch
      color={c}
      presetColors={PRE_COLOR}
      disableAlpha={disableAlpha}
      onChange={(color) => {
        if (COLOR_MAP.has(color.hexa) || COLOR_MAP.has(color.hex)) {
          onChange(COLOR_MAP.get(color.hex) || COLOR_MAP.get(color.hexa)!!)
        } else {
          onChange(color.hexa)
        }
      }}
    />
  )
}
ColorPicker.displayName = "ColorPicker"
