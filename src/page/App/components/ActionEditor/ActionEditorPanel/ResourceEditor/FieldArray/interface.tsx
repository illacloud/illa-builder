import { SelectProps } from "@illa-design/select"

export interface ValueType {
  key: string
  value: string
  _key: string
  type?: string
}

export interface FieldArrayProps {
  value?: ValueType[]
  onChange?: (newValue: ValueType) => void
  autoNewField?: boolean
  hasType?: boolean
  typeOptions?: SelectProps["options"]
  onAdd?: () => void
  onRemove?: (_key: string) => void
}
