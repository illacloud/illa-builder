import { ReactNode } from "react"
import { Params } from "@/redux/resource/restapiResource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface RecordEditorProps {
  label: string
  subLabel?: string
  onSubLabelClick?: () => void
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
  valueInputType?: VALIDATION_TYPES | "any"
}
