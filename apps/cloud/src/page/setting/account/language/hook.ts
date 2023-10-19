import { useTranslation } from "react-i18next"
import { languageKeys } from "@/i18n"

export const useLangOptions = () => {
  const { t } = useTranslation()

  return languageKeys.map((key) => ({
    label: t(`language.${key}`),
    value: key,
  }))
}
