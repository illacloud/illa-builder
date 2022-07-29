import { Params } from "@/redux/resource/resourceState"

export interface RecordEditorProps {
  label: any
  records: Params[]
  onAdd: () => void
  onDelete: (index: number, record: Params) => void
  onChangeKey: (index: number, key: string) => void
  onChangeValue: (index: number, value: string) => void
}
