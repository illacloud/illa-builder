import { ReactNode } from "react"
import { Params } from "@/redux/resource/restapiResource"

export interface RecordEditorProps {
  label: string
  name?: string
  records: Params[] | null
  onAdd: (name?: string) => void
  customRender?: (record: Params, index: number) => ReactNode
  onDelete: (index: number, record: Params, name?: string) => void
  onChangeKey: (
    index: number,
    key: string,
    value: string,
    name?: string,
  ) => void
  onChangeValue: (
    index: number,
    key: string,
    value: string,
    name?: string,
  ) => void
}
