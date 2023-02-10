import { MicrosoftSqlActionType } from "@/redux/currentApp/action/microsoftSqlAction"

export interface MSSQLModeProps {
  modeContent: MicrosoftSqlActionType
  onChange: (value: string, name: string) => void
  resourceId?: string
}
