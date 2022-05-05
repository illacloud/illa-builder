export default interface ILabelProps {
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
