import { Params } from "@/redux/resource/restapiResource"

export interface RecordEditorProps {
  label: string
  records: Params[] | null
  onAdd: () => void
  onDelete: (index: number, record: Params) => void
  onChangeKey: (index: number, key: string, value: string) => void
  onChangeValue: (index: number, key: string, value: string) => void
}
