export interface EditableTextProps {
  displayName: string
  updateDisplayNameByBlur: (value: string) => void
  onMouseEnter?: () => void
  onClick?: () => void
  onBlur?: (value: string) => void
  onValidate?: (result: "suc" | "failed") => void
}
