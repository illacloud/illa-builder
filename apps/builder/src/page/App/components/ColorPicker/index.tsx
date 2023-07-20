import Sketch from "@uiw/react-color-sketch"
import { SwatchPresetColor } from "@uiw/react-color-swatch"
import { FC, useMemo } from "react"
import { getColor } from "@illa-design/react"
import { colorSchemes } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { ColorPickerProps } from "./interface"

export const ColorPicker: FC<ColorPickerProps> = (props) => {
  const { onChange, selectedColor } = props

  const preColors = useMemo(() => {
    return colorSchemes.map((color) => {
      return {
        title: color,
        color: getColor(color, "03"),
      } as SwatchPresetColor
    })
  }, [])

  const colorMap = useMemo(() => {
    const m = new Map<string, string>()
    colorSchemes.forEach((color) => {
      m.set(getColor(color, "03"), color)
    })
    return m
  }, [])

  let c = selectedColor
  if (colorSchemes.includes(selectedColor)) {
    c = getColor(selectedColor, "03")
  }

  return (
    <Sketch
      color={c}
      presetColors={preColors}
      onChange={(color) => {
        if (colorMap.has(color.hexa)) {
          onChange(colorMap.get(color.hex) || colorMap.get(color.hexa)!!)
        } else {
          onChange(color.hexa)
        }
      }}
    />
  )
}
ColorPicker.displayName = "ColorPicker"
