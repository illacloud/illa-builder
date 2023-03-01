import { AppwriteActionTypes } from "@/redux/currentApp/action/appwriteAction"

export interface AppwriteSubPanelProps {
  params: AppwriteActionTypes
  withDataEditor?: boolean
  handleValueChange: (param: string) => (value: string) => void
}
