import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { getCurrentTranslateLanguage } from "@illa-public/user-data"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { defaultLanguage } from "@/i18n"
import { fetchUpdateUserLanguage } from "@/services/user"
import MobileLanguageSetting from "./mobile"
import PCLanguageSetting from "./pc"

const LanguageSetting: FC = () => {
  const language = useSelector(getCurrentTranslateLanguage) || defaultLanguage
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [languageLoading, setLanguageLoading] = useState(false)

  useEffect(() => {
    if (language !== currentLanguage) {
      setCurrentLanguage(language)
    }
    // todo: @echoxyc
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  const onSaveLanguageChange = async () => {
    try {
      setLanguageLoading(true)
      await fetchUpdateUserLanguage(currentLanguage)
      window.location.reload()
    } catch (e) {
    } finally {
      setLanguageLoading(false)
    }
  }
  return (
    <LayoutAutoChange
      desktopPage={
        <PCLanguageSetting
          loading={languageLoading}
          language={language}
          currentLanguage={currentLanguage}
          onChangeLanguage={setCurrentLanguage}
          onSubmit={onSaveLanguageChange}
        />
      }
      mobilePage={
        <MobileLanguageSetting
          loading={languageLoading}
          language={language}
          currentLanguage={currentLanguage}
          onChangeLanguage={setCurrentLanguage}
          onSubmit={onSaveLanguageChange}
        />
      }
    />
  )
}
export default LanguageSetting
