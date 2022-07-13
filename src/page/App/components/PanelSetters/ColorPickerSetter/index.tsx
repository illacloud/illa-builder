import { FC, useEffect, useState } from "react"
import { ColorPickerSetterProps } from "./interface"

import ColorPicker from "@/page/App/components/WidgetPickerEditor/components/ColorPicker"
import { hsvaToHex, hsvaToRgba } from "@uiw/color-convert"

export const ColorPickerSetter: FC<ColorPickerSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    handleUpdateDsl,
    expectedType,
    value,
    widgetDisplayName,
    options,
  } = props

  console.log("ColorPickerSetter", value)
  return (
    <div>
      <ColorPicker
        prefabricatedColors={options?.map((item) => item.key)}
        color={value}
        defaultColor={value}
        onColorChange={(value) => {
          const { r, g, b, a } = hsvaToRgba(value)
          console.log("onColorChange", value)
          const _res = `rgba(${r}, ${g}, ${b}, ${a})`
          handleUpdateDsl(attrName, _res)
        }}
      />
    </div>
  )
}

ColorPickerSetter.displayName = "BaseInput"
