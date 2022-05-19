import { BaseSetter } from "../interface"

export interface BaseInputSetterProps extends BaseSetter {
  placeholder?: string
  isInList?: boolean
  handleChange: (value: string | boolean, attrName?: string) => void
}
