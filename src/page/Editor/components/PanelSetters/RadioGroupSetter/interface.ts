export interface BaseRadioGroupProps {
  isFullWidth?: boolean
  defaultValue?: any
  options?: any
  handleChange: (value: string | boolean, attrName?: string) => void
  attrName: string
}
