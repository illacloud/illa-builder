import { ILLADriveActionTypeContent } from "@/redux/currentApp/action/illaDriveAction"

export interface ILLADriveActionPartProps {
  commandArgs: ILLADriveActionTypeContent
  handleOptionsValueChange: (name: string, value: string | boolean) => void
}
