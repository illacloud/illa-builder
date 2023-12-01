export interface ContentTypeSelectProps {
  value: string
  onChange: (name: string) => (value: string | boolean) => void
  fx: boolean
}
