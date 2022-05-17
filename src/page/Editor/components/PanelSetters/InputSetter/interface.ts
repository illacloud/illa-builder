export interface InputSetterProps {
  labelName: string
  labelDesc?: string
  isDouble?: boolean
  handleChange: (value: any) => void
  placeholder?: string
  defaultValue?: string
}
