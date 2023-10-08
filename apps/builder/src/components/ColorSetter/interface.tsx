export interface ColorPickerSetterProps {
  value: string
  handleUpdateColor: (color: string) => void
  setterSize?: "small" | "medium"
}
