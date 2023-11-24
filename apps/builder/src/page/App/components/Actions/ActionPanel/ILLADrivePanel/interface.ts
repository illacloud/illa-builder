import { ILLADriveActionTypeContent } from "@illa-public/public-types"

export interface ILLADriveActionPartProps {
  commandArgs: ILLADriveActionTypeContent
  handleOptionsValueChange: (name: string, value: string | boolean) => void
}
