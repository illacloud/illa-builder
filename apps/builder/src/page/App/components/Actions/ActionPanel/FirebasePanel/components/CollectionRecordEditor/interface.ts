import { Params } from "@/redux/currentApp/action/firebaseAction"

export interface CollectionRecordEditorProps {
  defaultValue: Params[]
  name: string
  handleValueChange: (value: Params[], name: string) => void
}
