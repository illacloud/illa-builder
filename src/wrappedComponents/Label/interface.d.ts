export default interface LabelProps {
  label?: string
  required?: boolean
  hideLabel?: boolean
  labelAlign?: "left" | "right"
  labelCaption?: string
  labelPosition?: "left" | "top"
  labelWidth?: number
  labelWidthUnit?: "px" | "%" | "col"
  hidden?: boolean
}
