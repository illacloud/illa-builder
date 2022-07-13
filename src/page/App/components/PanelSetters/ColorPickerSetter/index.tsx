import { FC, useMemo } from "react"
import { ColorPickerSetterProps } from "./interface"

import ColorPicker from "@/page/App/components/WidgetPickerEditor/components/ColorPicker"
import { hsvaToHexa } from "@uiw/color-convert/src"

export const ColorPickerSetter: FC<ColorPickerSetterProps> = (props) => {
  const { attrName, handleUpdateDsl, value, options } = props

  const _value = useMemo(() => {
    const index = options?.findIndex((item) => item.value === value)
    return options?.[index ?? -1]?.key ?? value
  }, [options, value])

  return (
    <div>
      <ColorPicker
        prefabricatedColors={options}
        color={_value}
        defaultColor={_value}
        onColorChange={(value) => {
          handleUpdateDsl(attrName, hsvaToHexa(value))
        }}
      />
    </div>
  )
}

ColorPickerSetter.displayName = "ColorPickerSetter"
