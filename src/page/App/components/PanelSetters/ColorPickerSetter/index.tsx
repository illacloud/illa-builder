import { FC, useMemo } from "react"
import { ColorPickerSetterProps } from "./interface"

import ColorPicker from "@/page/App/components/WidgetPickerEditor/components/ColorPicker"
import { hsvaToHexa } from "@uiw/color-convert/src"
import { applyColorSetterStyle } from "@/page/App/components/PanelSetters/ColorPickerSetter/style"

export const ColorPickerSetter: FC<ColorPickerSetterProps> = (props) => {
  const { attrName, handleUpdateDsl, value, options, isSetterSingleRow } = props

  const _value = useMemo(() => {
    const index = options?.findIndex((item) => item.value === value)
    return options?.[index ?? -1]?.key ?? value
  }, [options, value])

  return (
    <div css={applyColorSetterStyle(isSetterSingleRow)}>
      <ColorPicker
        prefabricatedColors={options}
        color={_value}
        onColorChange={(value) => {
          handleUpdateDsl(attrName, hsvaToHexa(value))
        }}
      />
    </div>
  )
}

ColorPickerSetter.displayName = "ColorPickerSetter"
