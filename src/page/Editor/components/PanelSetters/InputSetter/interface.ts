export interface BaseInputSetterProps {
  isFullWidth?: boolean
  placeholder?: string
  defaultValue?: string
  isInList?: boolean
  handleChange: (value: string | boolean, attrName?: string) => void
  attrName: string
}
