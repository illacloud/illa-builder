import { AppwriteActionTypes, Params } from "@illa-public/public-types"

export interface AppwriteSubPanelProps {
  params: AppwriteActionTypes
  withDataEditor?: boolean
  collectionIds: string[]
  handleValueChange: (param: string) => (value: string | Params[]) => void
}
