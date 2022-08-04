import { FC, useCallback, useMemo } from "react"
import { ColorPickerSetterProps } from "./interface"
import { debounce } from "lodash"
import ColorPicker from "@/page/App/components/WidgetPickerEditor/components/ColorPicker"
import { hsvaToHexa } from "@uiw/color-convert/src"
import { applyColorSetterStyle } from "@/page/App/components/PanelSetters/ColorPickerSetter/style"
import { HsvaColor } from "@uiw/color-convert"

export const ColorPickerSetter: FC<ColorPickerSetterProps> = (props) => {
  const { attrName, handleUpdateDsl, value, options, isSetterSingleRow } = props

  const _value = useMemo(() => {
    const index = options?.findIndex((item) => item.value === value)
    return options?.[index ?? -1]?.key ?? value
  }, [options, value])

  const debounceHandleUpdateDsl = useCallback(
    debounce((value: HsvaColor) => {
      handleUpdateDsl(attrName, hsvaToHexa(value))
    }, 300),
    [handleUpdateDsl],
  )

  return (
    <div css={applyColorSetterStyle(isSetterSingleRow)}>
      <ColorPicker
        prefabricatedColors={options}
        color={_value}
        onColorChange={debounceHandleUpdateDsl}
      />
    </div>
  )
}

ColorPickerSetter.displayName = "ColorPickerSetter"
