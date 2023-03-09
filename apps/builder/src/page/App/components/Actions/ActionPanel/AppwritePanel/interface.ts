import { AppwriteActionTypes } from "@/redux/currentApp/action/appwriteAction"
import { Params } from "@/redux/resource/restapiResource"

export interface AppwriteSubPanelProps {
  params: AppwriteActionTypes
  withDataEditor?: boolean
  collectionIds: string[]
  handleValueChange: (param: string) => (value: string | Params[]) => void
}
