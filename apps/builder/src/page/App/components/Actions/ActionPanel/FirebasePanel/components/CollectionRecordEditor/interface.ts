import { FirebaseWhere } from "@illa-public/public-types"

export interface CollectionRecordEditorProps {
  defaultValue: FirebaseWhere[]
  name: string
  handleValueChange: (value: FirebaseWhere[], name: string) => void
}
