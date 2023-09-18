export interface ColorPickerProps {
  selectedColor: string
  onChange: (color: string) => void
  disableAlpha?: boolean
}
