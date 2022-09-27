import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { publicButtonWrapperStyle } from "@/page/Setting/SettingAccount/style"
import { Button } from "@illa-design/button"
import { LabelAndSetter } from "@/page/Setting/Components/LabelAndSetter"
import { Select } from "@illa-design/select"
import { useSelector } from "react-redux"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { Api } from "@/api/base"
import { CurrentUser } from "@/redux/currentUser/currentUserState"

const options = [
  {
    label: "English",
    value: "en-US",
  },
  {
    label: "简体中文",
    value: "zh-CN",
  },
]

export const SettingOthers: FC = () => {
  const { t } = useTranslation()
  const userLanguage = useSelector(getCurrentUser).language || "en-US"

  const [languageValue, setLanguageValue] = useState(userLanguage)

  const [isLoading, setIsLoading] = useState(false)

  // TODO: @aruseito hack method,wait Router defender perfect
  useEffect(() => {
    setLanguageValue(userLanguage || "en-US")
  }, [userLanguage])

  const handleChangeLanguage = (value: string) => {
    setLanguageValue(value)
  }

  const isButtonDisabled = languageValue === userLanguage

  const handleClickSubmit = useCallback(() => {
    Api.request<CurrentUser>(
      {
        url: "/users/language",
        method: "PATCH",
        data: {
          language: languageValue,
        },
      },
      response => {
        localStorage.setItem("i18nextLng", languageValue)
        window.location.reload()
      },
      failure => {},
      crash => {},
      loading => {
        setIsLoading(loading)
      },
    )
  }, [languageValue])

  return (
    <>
      <LabelAndSetter errorMessage="" label={t("setting.other.language")}>
        <Select
          colorScheme="techPurple"
          size="large"
          options={options}
          value={languageValue}
          onChange={handleChangeLanguage}
        />
      </LabelAndSetter>

      <div css={publicButtonWrapperStyle}>
        <Button
          size="large"
          fullWidth
          disabled={isButtonDisabled}
          loading={isLoading}
          colorScheme="techPurple"
          onClick={handleClickSubmit}
        >
          {t("setting.password.submit_button")}
        </Button>
      </div>
    </>
  )
}

SettingOthers.displayName = "SettingOthers"
