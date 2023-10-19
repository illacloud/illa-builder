import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, Select } from "@illa-design/react"
import SettingMobileLayout from "@/page/setting/layout/mobile"
import { useLangOptions } from "../hook"
import { LanguageSettingMobileProps } from "./interface"
import {
  controllerContainerStyle,
  mobileContainerStyle,
  mobileSelectStyle,
} from "./style"

const MobileLanguageSetting: FC<LanguageSettingMobileProps> = (props) => {
  const { t } = useTranslation()
  const { onSubmit, loading, language, currentLanguage, onChangeLanguage } =
    props

  const buttonDisabled = language === currentLanguage
  const LANG_OPTIONS = useLangOptions()

  return (
    <SettingMobileLayout>
      <div css={mobileContainerStyle}>
        <section css={controllerContainerStyle}>
          <label>{t("profile.setting.language")}</label>
          <Select
            _css={mobileSelectStyle}
            value={currentLanguage}
            size="large"
            colorScheme="techPurple"
            options={LANG_OPTIONS}
            onChange={(value) => {
              onChangeLanguage(value as string)
            }}
          />
        </section>
        <Button
          colorScheme="techPurple"
          size="large"
          disabled={buttonDisabled}
          loading={loading}
          fullWidth
          onClick={() => {
            onSubmit()
          }}
        >
          {t("profile.setting.save")}
        </Button>
      </div>
    </SettingMobileLayout>
  )
}

MobileLanguageSetting.displayName = "LanguageSettingMobile"

export default MobileLanguageSetting
