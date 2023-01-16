import { ReactNode } from "react"
import { Params } from "@/redux/resource/restapiResource"

export interface InputRecordEditorProps {
  label: string
  records: Params[]
  onAdd: () => void
  customRender?: (record: Params, index: number) => ReactNode
  onDelete: (index: number, record: Params) => void
  onChangeKey: (index: number, key: string, value: string) => void
  onChangeValue: (index: number, key: string, value: string) => void
}
