import { HsvaColor } from "@uiw/color-convert"

export interface ColorPickerOperationProps {
  color: HsvaColor
  handleColorPick: (colorPicker: HsvaColor) => void
  handleClosePanel: () => void
  prefabricatedColors?: { key: string; value: string }[]
  handleHueChange?: (newHue: { h: number }) => void
  handleAlphaChange?: (newHue: { a: number }) => void
}

export interface ColorPickerProps {
  defaultColor?: string
  color?: string
  placeholder?: string
  prefabricatedColors?: { key: string; value: string }[]
  onHueChange?: (newHue: { h: number }) => void
  onAlphaChange?: (newHue: { a: number }) => void
  onColorChange?: (hsva: HsvaColor) => void
}
