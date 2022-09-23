import { Params } from "@/redux/resource/resourceState"

export interface InputRecordEditorProps {
  label: string
  records: Params[]
  onAdd: () => void
  onDelete: (index: number, record: Params) => void
  onChangeKey: (index: number, key: string, value: string) => void
  onChangeValue: (index: number, key: string, value: string) => void
}
