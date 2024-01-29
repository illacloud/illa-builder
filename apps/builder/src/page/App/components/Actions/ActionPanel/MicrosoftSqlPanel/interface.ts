import { MicrosoftSqlActionType } from "@illa-public/public-types"

export interface MSSQLModeProps {
  modeContent: MicrosoftSqlActionType
  onChange: (value: string, name: string) => void
  resourceID?: string
  showSafeModeTips?: boolean
}
