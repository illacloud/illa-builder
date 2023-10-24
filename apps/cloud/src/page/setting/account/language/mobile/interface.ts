export interface LanguageSettingMobileProps {
  loading: boolean
  language: string
  currentLanguage: string
  onChangeLanguage: (language: string) => void
  onSubmit: () => void
}
