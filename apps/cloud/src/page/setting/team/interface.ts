export interface TeamSettingFields {
  name?: string
  identifier?: string
  icon?: string
}

export type TeamSettingErrorMsg = Partial<
  Record<keyof TeamSettingFields, string>
>

export interface SettingContextType {
  onClickLeaveTeam?: () => void
}
