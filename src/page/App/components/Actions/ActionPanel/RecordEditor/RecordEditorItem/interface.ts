import { Params } from "@/redux/resource/resourceState"

export interface RecordEditorItemProps {
  record: Params
  onDelete: (record: Params) => void
}
