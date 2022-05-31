export interface ValueType {
  key: string
  value: string
  type?: "text" | "file"
}

export interface FieldArrayProps {
  value?: ValueType[]
  onChange?: (newValue: ValueType[]) => void
  autoNewField?: boolean
  hasType?: boolean
}
