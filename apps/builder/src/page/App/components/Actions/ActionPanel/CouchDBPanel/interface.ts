import { CouchDBOptionsType } from "@illa-public/public-types"
import { SelectValue } from "@illa-design/react"

export interface CouchDBSubPanelProps {
  onInputValueChange: (name: string | string[]) => (value: SelectValue) => void
  onBooleanValueChange: (name: string | string[]) => (value: boolean) => void
  opts: CouchDBOptionsType
}
