export interface LanguageSettingProps {
  loading: boolean
  language: string
  currentLanguage: string
  onChangeLanguage: (language: string) => void
  onSubmit: () => void
}
