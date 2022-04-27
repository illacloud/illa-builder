import { HsvaColor, hsvaToRgba } from "@uiw/color-convert"
import colorPicker from "@/page/Editor/components/WidgetPickerEditor/components/ColorPicker/index"

export interface ColorPickerOperationProps {
  color: HsvaColor
  handleColorPick: (colorPicker: HsvaColor) => void
  handleClosePanel: () => void
  prefabricatedColors?: string[]
}

export interface ColorPickerProps {
  defaultColor?: string
  color?: string
  labelName?: string
  onColorChange?: (hsva: HsvaColor) => void
  placeholder?: string
  prefabricatedColors?: string[]
}
