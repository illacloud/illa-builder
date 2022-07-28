import { Params } from "@/redux/resource/resourceState"

export interface RecordEditorProps {
  label: string
  records: Params[]
  onChange: (records: Params[]) => void
}
